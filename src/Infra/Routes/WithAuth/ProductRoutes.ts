import { ProductController } from '../../../Product/Controllers/ProductController'
import { RouteDto } from '../../Dto/RouteDto'
import { AuthRouteContract } from '../Contracts/AuthRouteContract'
import { MethodEnum } from '../Enums/MethodEnum'

export class ProductRoutes extends AuthRouteContract {
  private static productController: ProductController

  constructor() {
    super('product')
  }

  public static getProductController() {
    if (!this.productController)
      this.productController = new ProductController()

    return this.productController
  }

  public getRoutes(): RouteDto[] {
    const controller = ProductRoutes.getProductController()

    return [
      new RouteDto(this.getFullEndpoint(), MethodEnum.POST, controller.post)
    ]
  }
}
