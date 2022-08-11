import * as fs from 'fs'
import * as path from 'path'

import { EndpointPermissions } from './Models/EndpointPermissions'

export class EndpointPermissionsService {
  constructor() {}

  public async get(): Promise<EndpointPermissions[]> {
    const resourcesPath = path.join(__dirname, '..', '..', '..', 'resources')

    const fileContent = fs
      .readFileSync(path.join(resourcesPath, 'endpointPermissions.json'))
      .toString()

    const endpointPermissions = []

    JSON.parse(fileContent).forEach(({ roleType, permissions }) => {
      const endpointPermission = new EndpointPermissions(roleType)

      permissions.forEach(permission => {
        endpointPermission.addPermission(permission)
      })

      endpointPermissions.push(endpointPermission)
    })

    return endpointPermissions
  }
}
