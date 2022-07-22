import { CategoryController } from '../../../Domain/Category/CategoryController'
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
      new RouteDto(this.getFullEndpoint(), MethodEnum.POST, controller.post),
      new RouteDto(
        this.getFullEndpoint('/tree'),
        MethodEnum.GET,
        controller.getTree
      )
      // TODO: PATCH
      // TODO: DELETE
      // TODO: GET ONE
    ]
  }
}
