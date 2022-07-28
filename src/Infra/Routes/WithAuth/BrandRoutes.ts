import { BrandController } from '../../../Domain/Brand/BrandController'
import { RouteDto } from '../../Dto/RouteDto'
import { AuthRouteContract } from '../Contracts/AuthRouteContract'
import { MethodEnum } from '../Enums/MethodEnum'

export class BrandRoutes extends AuthRouteContract<BrandController> {
  constructor(controller: BrandController) {
    super('brand', controller)
  }

  public getRoutes(): RouteDto[] {
    const controller = this.getController()

    return [
      new RouteDto(this.getFullEndpoint(), MethodEnum.POST, controller.post),
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
      // TODO: PATCH
      // TODO: DELETE
    ]
  }
}
