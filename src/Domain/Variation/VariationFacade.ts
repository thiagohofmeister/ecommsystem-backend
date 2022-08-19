import { FacadeContract } from '../../Shared/Facades/Contracts/FacadeContract'
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
          .buildVariationService(manager)
          .saveStocks(sku, storeId, data)
      })
  }
}
