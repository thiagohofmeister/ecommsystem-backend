import { ProductController } from '../../../Product/Controllers/ProductController'
import { AuthRouteContract } from '../Contracts/AuthRouteContract'
import { MethodEnum } from '../Enums/MethodEnum'
import { Route } from '../Interfaces/Route'

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

  public getRoutes(): Route[] {
    const controller = ProductRoutes.getProductController()

    return [
      {
        path: this.getFullEndpoint(''),
        method: MethodEnum.POST,
        handle: controller.create.bind(controller)
      }
    ]
  }
}
