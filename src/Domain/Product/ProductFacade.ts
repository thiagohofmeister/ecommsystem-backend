import { FacadeContract } from '../../Shared/Facades/Contracts/FacadeContract'
import { ProductCreateDto } from './Dto/ProductCreateDto'
import { ProductGetListFilterDto } from './Dto/ProductGetListFilterDto'
import { ProductSavePriceDto } from './Dto/ProductSavePriceDto'

export class ProductFacade extends FacadeContract {
  public async create(storeId: string, data: ProductCreateDto) {
    return this.serviceFactory
      .buildTransactionalService()
      .execute(async manager => {
        return await this.serviceFactory
          .buildProductService(manager)
          .create(storeId, data)
      })
  }

  public async update(id: string, data: ProductCreateDto) {
    return this.serviceFactory
      .buildTransactionalService()
      .execute(async manager => {
        return await this.serviceFactory
          .buildProductService(manager)
          .update(id, data)
      })
  }

  public async getOneById(id: string) {
    return await this.serviceFactory.buildProductService().getOneById(id)
  }

  public async getList(filter: ProductGetListFilterDto) {
    return await this.serviceFactory.buildProductService().list(filter)
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
          .buildProductService(manager)
          .savePrices(id, storeId, data)
      })
  }
}
