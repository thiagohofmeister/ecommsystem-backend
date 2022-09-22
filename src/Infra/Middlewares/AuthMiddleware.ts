import { CoreRequest } from 'ecommsystem-core'
import { NextFunction, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import * as md5 from 'md5'

import { EndpointPermissionsService } from '../../Domain/EndpointPermissions/EndpointPermissionsService'
import { AuthenticationTokenDto } from '../../Domain/User/Dto/AuthenticationTokenDto'
import { UserRoleTypeEnum } from '../../Domain/User/Enums/UserRoleTypeEnum'
import { Redis } from '../Database/Redis'

export class AuthMiddleware {
  public constructor() {
    this.all = this.all.bind(this)
    this.isPublicRequest = this.isPublicRequest.bind(this)
    this.isGuestRequest = this.isGuestRequest.bind(this)
    this.formatRequest = this.formatRequest.bind(this)
    this.validateRoleAndPermissions = this.validateRoleAndPermissions.bind(this)
    this.decodeToken = this.decodeToken.bind(this)
  }

  public async all(req: CoreRequest, res: Response, next: NextFunction) {
    let userPermissions = []

    if (this.isPublicRequest(req)) {
      this.formatRequest(req, UserRoleTypeEnum.PUBLIC)
    } else if (this.isGuestRequest(req)) {
      this.formatRequest(req, UserRoleTypeEnum.GUEST)
    } else {
      const [tokenType, token] = req.header('authorization').split(' ')

      const decodedToken = this.decodeToken(token)

      if (tokenType !== 'Bearer' || !decodedToken) {
        return res.status(401).send({
          code: `401.unauthorizedException`,
          message: 'Unauthorized.'
        })
      }

      await new Redis().createClient()
      const redis = Redis.getClient()

      const key = `auth:${decodedToken.user.id}:${decodedToken.user.roleType}:${md5(JSON.stringify(decodedToken))}`

      userPermissions = JSON.parse(await redis.get(key))

      if (!userPermissions) {
        return res.status(401).send({
          code: `401.unauthorizedException`,
          message: 'Unauthorized.'
        })
      }

      this.formatRequest(req, decodedToken.user.roleType, decodedToken)
    }

    const roleType = req.context.user.roleType as UserRoleTypeEnum

    if (!(await this.validateRoleAndPermissions(req, roleType, userPermissions))) {
      return res.status(401).send({
        code: `401.unauthorizedException`,
        message: 'Unauthorized.'
      })
    }

    next()
  }

  private isPublicRequest(req: CoreRequest) {
    return !req.header('x-store') && !req.header('authorization')
  }

  private isGuestRequest(req: CoreRequest) {
    return !!req.header('x-store')
  }

  private formatRequest(req: CoreRequest, roleType: UserRoleTypeEnum, token?: AuthenticationTokenDto) {
    if (roleType === UserRoleTypeEnum.GUEST) {
      req.context = {
        storeId: req.header('x-store'),
        user: {
          id: 'guest',
          email: 'guest@platform.com',
          roleType: UserRoleTypeEnum.GUEST
        }
      }
    } else if (roleType !== UserRoleTypeEnum.PUBLIC) {
      delete req.headers['authorization']

      req.context = {
        storeId: token.store.id,
        user: {
          id: token.user.id,
          email: token.user.email,
          roleType: token.user.roleType
        }
      }
    } else {
      req.context = {
        user: {
          roleType: UserRoleTypeEnum.PUBLIC
        }
      }
    }
  }

  private async validateRoleAndPermissions(req: CoreRequest, roleType: UserRoleTypeEnum, userPermissions) {
    const servicePermissions = await new EndpointPermissionsService().get()
    const permissions = servicePermissions.find(sp => sp.getRoleType() === roleType)?.getPermissions() || []

    if (!permissions.length) {
      return false
    }

    let urlAccessedAttrs = req.url.split('/').filter(u => !!u)

    for (const permission of permissions) {
      const endpointAttrs = permission.endpoint.split('/').filter(e => !!e)

      if (endpointAttrs.length !== urlAccessedAttrs.length && !endpointAttrs.includes('*')) {
        continue
      }

      let continue2 = false

      for (const i in endpointAttrs) {
        const endpoint = endpointAttrs[i]
        const accessed = urlAccessedAttrs[i]

        if (endpoint === accessed || endpoint[0] === '$' || endpoint[0] === '*') {
          continue
        }

        continue2 = true
        break
      }

      if (continue2 || (!permission.methods.includes(req.method) && !permission.methods.includes('*'))) {
        continue
      }

      return true
    }

    return false
  }

  private decodeToken(token: string): AuthenticationTokenDto {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_KEY, { algorithms: ['HS256'] })
      delete decodedToken['iat']
      return decodedToken as AuthenticationTokenDto
    } catch {
      return null
    }
  }
}
