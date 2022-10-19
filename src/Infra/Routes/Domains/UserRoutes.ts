import { UserController } from '../../../Domain/User/UserController'
import { RouteDto } from '../../Dto/RouteDto'
import { AuthRouteContract } from '../Contracts/AuthRouteContract'
import { MethodEnum } from '../Enums/MethodEnum'

export class UserRoutes extends AuthRouteContract<UserController> {
  getRoutes(): RouteDto[] {
    const controller = this.getController()

    return [new RouteDto(this.getFullEndpoint('/me'), MethodEnum.GET, controller.getLogged)]
  }
}
