import { EndpointPermissionsController } from '../../../Domain/EndpointPermissions/EndpointPermissionsController'
import { RouteDto } from '../../Dto/RouteDto'
import { AuthRouteContract } from '../Contracts/AuthRouteContract'
import { MethodEnum } from '../Enums/MethodEnum'

export class EndpointPermissionsRoutes extends AuthRouteContract<EndpointPermissionsController> {
  public getRoutes(): RouteDto[] {
    const controller = this.getController()

    return [
      new RouteDto(this.getFullEndpoint(), MethodEnum.GET, controller.get)
    ]
  }
}
