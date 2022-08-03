import { FacadeContract } from '../../Core/Facades/Contracts/FacadeContract'
import { VariationSavePricesDto as VariationSaveStocksDto } from './Dto/VariationSaveStocksDto'

export class VariationFacade extends FacadeContract {
  public async updateStocks(
    sku: string,
    storeId: string,
    data: VariationSaveStocksDto[]
  ) {
    return this.serviceFactory
      .buildTransactionalService()
      .execute(async manager => {
        return await this.serviceFactory
          .buildVariationSaveStocksService(manager)
          .execute(sku, storeId, data)
      })
  }
}
