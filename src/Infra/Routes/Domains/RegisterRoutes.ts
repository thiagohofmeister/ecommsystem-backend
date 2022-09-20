import { RegisterController } from '../../../Domain/Register/RegisterController'
import { RouteDto } from '../../Dto/RouteDto'
import { RouteContract } from '../Contracts/RouteContract'
import { MethodEnum } from '../Enums/MethodEnum'

export class RegisterRoutes extends RouteContract<RegisterController> {
  getRoutes(): RouteDto[] {
    const controller = this.getController()

    return [
      new RouteDto(this.getFullEndpoint(), MethodEnum.POST, controller.post)
    ]
  }
}
