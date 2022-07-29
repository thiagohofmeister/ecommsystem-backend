import { FacadeContract } from '../../Core/Facades/Contracts/FacadeContract'
import { ProductCreateDto } from './Dto/ProductCreateDto'
import { ProductGetListFilterDto } from './Dto/ProductGetListFilterDto'
import { ProductSavePriceDto } from './Dto/ProductSavePriceDto'

export class ProductFacade extends FacadeContract {
  public async create(storeId: string, data: ProductCreateDto) {
    return this.serviceFactory
      .buildTransactionalService()
      .execute(async manager => {
        return await this.serviceFactory
          .buildProductCreateService(manager)
          .execute(storeId, data)
      })
  }

  public async update(id: string, data: ProductCreateDto) {
    return this.serviceFactory
      .buildTransactionalService()
      .execute(async manager => {
        return await this.serviceFactory
          .buildProductUpdateService(manager)
          .execute(id, data)
      })
  }

  public async getOneById(id: string) {
    return await this.serviceFactory.buildProductGetOneByIdService().execute(id)
  }

  public async getList(filter: ProductGetListFilterDto) {
    return await this.serviceFactory
      .buildProductGetListService()
      .execute(filter)
  }

  public async updatePrices(
    id: string,
    storeId: string,
    data: ProductSavePriceDto[]
  ) {
    return this.serviceFactory
      .buildTransactionalService()
      .execute(async manager => {
        return await this.serviceFactory
          .buildProductSavePricesService(manager)
          .execute(id, storeId, data)
      })
  }
}
