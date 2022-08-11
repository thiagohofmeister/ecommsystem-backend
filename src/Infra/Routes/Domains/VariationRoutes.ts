import { VariationController } from '../../../Domain/Variation/VariationController'
import { RouteDto } from '../../Dto/RouteDto'
import { AuthRouteContract } from '../Contracts/AuthRouteContract'
import { MethodEnum } from '../Enums/MethodEnum'

export class VariationRoutes extends AuthRouteContract<VariationController> {
  public getRoutes(): RouteDto[] {
    const controller = this.getController()

    return [
      new RouteDto(
        this.getFullEndpoint('/:sku/stocks'),
        MethodEnum.PUT,
        controller.putStocks
      )
      // TODO: GET
    ]
  }
}
