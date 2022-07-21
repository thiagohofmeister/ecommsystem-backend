import { ServiceFactory } from '../../Core/Factories/ServiceFactory'
import { ProductCreateDto } from '../Dto/ProductCreateDto'

export class ProductFacade {
  constructor(private readonly serviceFactory: ServiceFactory) {}

  public async create(storeId: string, data: ProductCreateDto) {
    return this.serviceFactory
      .buildTransactionalService()
      .execute(async manager => {
        const productCreateService =
          this.serviceFactory.buildProductCreateService(manager)

        return await productCreateService.execute(storeId, data)
      })
  }
}
