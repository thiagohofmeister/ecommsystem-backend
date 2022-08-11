import { WarehouseController } from '../../../Domain/Warehouse/WarehouseController'
import { RouteDto } from '../../Dto/RouteDto'
import { AuthRouteContract } from '../Contracts/AuthRouteContract'
import { MethodEnum } from '../Enums/MethodEnum'

export class WarehouseRoutes extends AuthRouteContract<WarehouseController> {
  public getRoutes(): RouteDto[] {
    const controller = this.getController()

    return [
      new RouteDto(this.getFullEndpoint(), MethodEnum.POST, controller.post),
      new RouteDto(
        this.getFullEndpoint('/priorities'),
        MethodEnum.PUT,
        controller.putPriorities
      ),
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
