import { FacadeContract } from '../../Core/Facades/Contracts/FacadeContract'

export class EndpointPermissionsFacade extends FacadeContract {
  public get() {
    return this.serviceFactory.buildEndpointPermissionsService().get()
  }
}
