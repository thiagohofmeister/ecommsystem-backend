import { EntityDataMapperContract } from 'ecommsystem-core'
import { Stock } from '../../Domain/Variation/Models/Stock'
import { StockDao } from '../Models/StockDao'

export class StockDataMapper extends EntityDataMapperContract<Stock, StockDao> {
  toDomainEntity(entity: StockDao): Stock {
    return new Stock(entity.quantity, entity.storeId)
  }

  toDaoEntity(domain: Stock): StockDao {
    return new StockDao(domain.getStoreId(), domain.getQuantity())
  }
}
