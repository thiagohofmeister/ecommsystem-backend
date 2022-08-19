import { EntityDataMapperContract } from 'ecommsystem-core'
import { Stock } from '../../Domain/Variation/Models/Stock'
import { StockDao } from '../Models/StockDao'
import { StockDataMapper } from './StockDataMapper'
import { VariationDataMapper } from './VariationDataMapper'
import { WarehouseDataMapper } from './WarehouseDataMapper'

export class StockDataMapperMediator extends EntityDataMapperContract<
  Stock,
  StockDao
> {
  constructor(
    private readonly stockDataMapper: StockDataMapper,
    private readonly warehouseDataMapper: WarehouseDataMapper,
    private readonly variationDataMapper: VariationDataMapper
  ) {
    super()
  }

  toDomainEntity(entity: StockDao): Stock {
    const variationAttribute = this.stockDataMapper.toDomainEntity(entity)

    if (entity.variation) {
      variationAttribute.setVariation(
        this.variationDataMapper.toDomainEntity(entity.variation)
      )
    }

    if (entity.warehouse) {
      variationAttribute.setWarehouse(
        this.warehouseDataMapper.toDomainEntity(entity.warehouse)
      )
    }

    return variationAttribute
  }

  toDaoEntity(domain: Stock): StockDao {
    const variationAttribute = this.stockDataMapper.toDaoEntity(domain)

    if (domain.getVariation()) {
      variationAttribute.variation = this.variationDataMapper.toDaoEntity(
        domain.getVariation()
      )
    }

    if (domain.getWarehouse()) {
      variationAttribute.warehouse = this.warehouseDataMapper.toDaoEntity(
        domain.getWarehouse()
      )
    }

    return variationAttribute
  }
}
