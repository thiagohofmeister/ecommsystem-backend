import { EntityDataMapperContract } from 'ecommsystem-core'
import { Variation } from '../../Domain/Variation/Models/Variation'
import { VariationDao } from '../Models/VariationDao'
import { PriceDataMapperMediator } from './PriceDataMapperMediator'
import { ProductDataMapper } from './ProductDataMapper'
import { StockDataMapperMediator } from './StockDataMapperMediator'
import { VariationAttributeDataMapperMediator } from './VariationAttributeDataMapperMediator'
import { VariationDataMapper } from './VariationDataMapper'

export class VariationDataMapperMediator extends EntityDataMapperContract<
  Variation,
  VariationDao
> {
  constructor(
    private readonly variationDataMapper: VariationDataMapper,
    private readonly productDataMapper: ProductDataMapper,
    private readonly variationAttributeDataMapperMediator: VariationAttributeDataMapperMediator,
    private readonly stockDataMapperMediator: StockDataMapperMediator,
    private readonly priceDataMapperMediator: PriceDataMapperMediator
  ) {
    super()
  }

  toDomainEntity(entity: VariationDao): Variation {
    const variation = this.variationDataMapper.toDomainEntity(entity)

    if (entity.product) {
      variation.setProduct(
        this.productDataMapper.toDomainEntity(entity.product)
      )
    }

    if (entity.variationAttributes) {
      variation.removeAttributes([])
      entity.variationAttributes.forEach(varAttr => {
        variation.addAttribute(
          this.variationAttributeDataMapperMediator.toDomainEntity(varAttr)
        )
      })
    }

    if (entity.stocks) {
      variation.removeStocks([])
      entity.stocks.forEach(stock => {
        variation.addStock(this.stockDataMapperMediator.toDomainEntity(stock))
      })
    }

    if (entity.prices) {
      variation.removePrices([])
      entity.prices.forEach(price => {
        variation.addPrice(this.priceDataMapperMediator.toDomainEntity(price))
      })
    }

    return variation
  }

  toDaoEntity(domain: Variation): VariationDao {
    const variation = this.variationDataMapper.toDaoEntity(domain)

    if (domain.getProduct()) {
      variation.product = this.productDataMapper.toDaoEntity(
        domain.getProduct()
      )
    }

    if (domain.getAttributes()) {
      variation.variationAttributes =
        this.variationAttributeDataMapperMediator.toDaoEntityMany(
          domain.getAttributes()
        )
    }

    if (domain.getStocks()) {
      variation.stocks = this.stockDataMapperMediator.toDaoEntityMany(
        domain.getStocks()
      )
    }

    if (domain.getPrices()) {
      variation.prices = this.priceDataMapperMediator.toDaoEntityMany(
        domain.getPrices()
      )
    }

    return variation
  }
}
