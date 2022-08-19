import { FacadeContract } from '../../Shared/Facades/Contracts/FacadeContract'

export class EndpointPermissionsFacade extends FacadeContract {
  public get() {
    return this.serviceFactory.buildEndpointPermissionsService().get()
  }
}
