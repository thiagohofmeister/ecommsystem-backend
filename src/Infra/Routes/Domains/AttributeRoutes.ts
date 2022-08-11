import { AttributeController } from '../../../Domain/Attribute/AttributeController'
import { RouteDto } from '../../Dto/RouteDto'
import { AuthRouteContract } from '../Contracts/AuthRouteContract'
import { MethodEnum } from '../Enums/MethodEnum'

export class AttributeRoutes extends AuthRouteContract<AttributeController> {
  public getRoutes(): RouteDto[] {
    const controller = this.getController()

    return [
      new RouteDto(this.getFullEndpoint(), MethodEnum.POST, controller.post),
      new RouteDto(
        this.getFullEndpoint('/:id'),
        MethodEnum.PATCH,
        controller.patch
      ),
      new RouteDto(
        this.getFullEndpoint('/:id'),
        MethodEnum.GET,
        controller.getOneById
      ),
      new RouteDto(this.getFullEndpoint(), MethodEnum.GET, controller.get),
      new RouteDto(
        this.getFullEndpoint('/:id'),
        MethodEnum.GET,
        controller.getOneById
      )
      // TODO: DELETE
    ]
  }
}
