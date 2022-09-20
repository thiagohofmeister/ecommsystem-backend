import { JWT, RedisCollection } from 'ecommsystem-core'
import * as md5 from 'md5'

import { EndpointPermissionsService } from '../EndpointPermissions/EndpointPermissionsService'
import { Store } from '../Store/Models/Store'
import { UserRoleTypeEnum } from '../User/Enums/UserRoleTypeEnum'
import { User } from '../User/Models/User'
import { UserService } from '../User/UserService'
import { AuthenticationCreateDto } from './Dto/AuthenticationCreateDto'
import { AuthenticationTokenDto } from './Dto/AuthenticationTokenDto'
import { Authentication } from './Models/Authentication'
import { AuthenticationRepository } from './Repositories/AuthenticationRepository'

export class AuthenticationService {
  constructor(
    private readonly authenticationRepository: AuthenticationRepository,
    private readonly userService: UserService,
    private readonly endpointPermissionsService: EndpointPermissionsService,
    private readonly jwt: JWT
  ) {}

  async create(data: AuthenticationCreateDto) {
    const user = await this.userService.findOneByAuthData(data)

    const store = user.getAllStores()?.[0]

    let roleType = UserRoleTypeEnum.MANAGER
    if (!!user.getStore()) {
      roleType = UserRoleTypeEnum.CUSTOMER
    }

    const jwtTokenData: AuthenticationTokenDto = {
      user: {
        id: user.getId(),
        name: user.getName(),
        email: user.getEmail(),
        roleType
      },
      store: store
        ? {
            id: store.getId()
          }
        : null
    }

    const token = this.jwt.sign(jwtTokenData)

    const userPermissions = await this.getUserPermissions(user, store, roleType)

    await this.authenticationRepository.create(
      new RedisCollection(`${user.getId()}:${roleType}:${md5(JSON.stringify(jwtTokenData))}`, userPermissions)
    )

    return new Authentication(token)
  }

  private async getUserPermissions(user: User, store: Store, roleType: UserRoleTypeEnum) {
    if (!user.isOwnerOfStore(store.getId()) && roleType === UserRoleTypeEnum.MANAGER) {
      // TODO: Inject user permissions by relationship between store and user (user_store table)
      return []
    }

    return (await this.endpointPermissionsService.get()).find(ep => ep.getRoleType() === roleType).getPermissions()
  }
}
