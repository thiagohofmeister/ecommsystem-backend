import { AuthenticationController } from '../../../Domain/Authentication/AuthenticationController'
import { RouteDto } from '../../Dto/RouteDto'
import { RouteContract } from '../Contracts/RouteContract'
import { MethodEnum } from '../Enums/MethodEnum'

export class AuthenticationRoutes extends RouteContract<AuthenticationController> {
  getRoutes(): RouteDto[] {
    const controller = this.getController()

    return [
      new RouteDto(this.getFullEndpoint(), MethodEnum.POST, controller.post)
    ]
  }
}
