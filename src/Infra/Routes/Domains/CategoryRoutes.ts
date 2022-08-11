import { CategoryController } from '../../../Domain/Category/CategoryController'
import { RouteDto } from '../../Dto/RouteDto'
import { AuthRouteContract } from '../Contracts/AuthRouteContract'
import { MethodEnum } from '../Enums/MethodEnum'

export class CategoryRoutes extends AuthRouteContract<CategoryController> {
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
        this.getFullEndpoint('/tree'),
        MethodEnum.GET,
        controller.getTree
      ),
      new RouteDto(
        this.getFullEndpoint('/:id'),
        MethodEnum.GET,
        controller.getOneById
      )
      // TODO: DELETE
    ]
  }
}
