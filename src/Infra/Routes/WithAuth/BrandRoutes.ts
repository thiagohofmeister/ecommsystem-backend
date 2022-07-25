import { BrandController } from '../../../Domain/Brand/BrandController'
import { RouteDto } from '../../Dto/RouteDto'
import { AuthRouteContract } from '../Contracts/AuthRouteContract'
import { MethodEnum } from '../Enums/MethodEnum'

export class BrandRoutes extends AuthRouteContract {
  private static brandController: BrandController

  constructor() {
    super('brand')
  }

  public static getBrandController() {
    if (!this.brandController) this.brandController = new BrandController()

    return this.brandController
  }

  public getRoutes(): RouteDto[] {
    const controller = BrandRoutes.getBrandController()

    return [
      new RouteDto(this.getFullEndpoint(), MethodEnum.POST, controller.post),
      new RouteDto(
        this.getFullEndpoint('/:id'),
        MethodEnum.GET,
        controller.getOneById
      ),
      new RouteDto(this.getFullEndpoint(), MethodEnum.GET, controller.get)
      // TODO: PATCH
      // TODO: DELETE
      // TODO: GET ONE
    ]
  }
}
