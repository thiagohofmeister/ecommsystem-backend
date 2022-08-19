import { ViewContract } from 'ecommsystem-core'

import { EndpointPermissions } from '../Models/EndpointPermissions'

export class EndpointPermissionsView extends ViewContract<
  EndpointPermissions,
  EndpointPermissionsResponse
> {
  protected renderOne(entity: EndpointPermissions) {
    return {
      roleType: entity.getRoleType(),
      permissions: entity.getPermissions()
    }
  }
}

export interface EndpointPermissionsResponse {
  roleType: string
  permissions: {
    endpoint: string
    methods: string | string[]
  }[]
}
