import { FacadeContract } from '../../Core/Facades/Contracts/FacadeContract'
import { ProductCreateDto } from '../Dto/ProductCreateDto'

export class ProductFacade extends FacadeContract {
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
