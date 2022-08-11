import { ProductController } from '../../../Domain/Product/ProductController'
import { RouteDto } from '../../Dto/RouteDto'
import { AuthRouteContract } from '../Contracts/AuthRouteContract'
import { MethodEnum } from '../Enums/MethodEnum'

export class ProductRoutes extends AuthRouteContract<ProductController> {
  public getRoutes(): RouteDto[] {
    const controller = this.getController()

    return [
      new RouteDto(this.getFullEndpoint(), MethodEnum.POST, controller.post),
      new RouteDto(
        this.getFullEndpoint('/:id'),
        MethodEnum.GET,
        controller.getOneById
      ),
      new RouteDto(
        this.getFullEndpoint('/:id'),
        MethodEnum.PATCH,
        controller.patch
      ),
      new RouteDto(
        this.getFullEndpoint('/:id/prices'),
        MethodEnum.PUT,
        controller.putPrices
      ),
      new RouteDto(this.getFullEndpoint(), MethodEnum.GET, controller.getList)
      // TODO: DELETE
    ]
  }
}
