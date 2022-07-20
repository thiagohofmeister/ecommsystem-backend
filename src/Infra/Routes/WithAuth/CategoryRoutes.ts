import { CategoryController } from '../../../Category/Controllers/CategoryController'
import { RouteDto } from '../../Dto/RouteDto'
import { AuthRouteContract } from '../Contracts/AuthRouteContract'
import { MethodEnum } from '../Enums/MethodEnum'

export class CategoryRoutes extends AuthRouteContract {
  private static categoryController: CategoryController

  constructor() {
    super('category')
  }

  public static getCategoryController() {
    if (!this.categoryController)
      this.categoryController = new CategoryController()

    return this.categoryController
  }

  public getRoutes(): RouteDto[] {
    const controller = CategoryRoutes.getCategoryController()

    return [
      new RouteDto(this.getFullEndpoint(), MethodEnum.POST, controller.post)
    ]
  }
}
