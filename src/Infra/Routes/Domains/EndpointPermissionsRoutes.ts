import { EndpointPermissionsController } from '../../../Domain/EndpointPermissions/EndpointPermissionsController'
import { RouteDto } from '../../Dto/RouteDto'
import { RouteContract } from '../Contracts/RouteContract'
import { MethodEnum } from '../Enums/MethodEnum'

export class EndpointPermissionsRoutes extends RouteContract<EndpointPermissionsController> {
  public getRoutes(): RouteDto[] {
    const controller = this.getController()

    return [
      new RouteDto(this.getFullEndpoint(), MethodEnum.GET, controller.get)
    ]
  }
}
