import { EntityDataMapperContract } from 'ecommsystem-core'
import { Price } from '../../Domain/Product/Models/Price'
import { PriceDao } from '../Models/PriceDao'
import { PriceDataMapper } from './PriceDataMapper'
import { VariationDataMapper } from './VariationDataMapper'

export class PriceDataMapperMediator extends EntityDataMapperContract<
  Price,
  PriceDao
> {
  constructor(
    private readonly priceDataMapper: PriceDataMapper,
    private readonly variationDataMapper: VariationDataMapper
  ) {
    super()
  }

  toDomainEntity(entity: PriceDao): Price {
    const price = this.priceDataMapper.toDomainEntity(entity)

    if (entity.variation) {
      price.setVariation(
        this.variationDataMapper.toDomainEntity(entity.variation)
      )
    }

    return price
  }

  toDaoEntity(domain: Price): PriceDao {
    const price = this.priceDataMapper.toDaoEntity(domain)

    if (domain.getVariation()) {
      price.variation = this.variationDataMapper.toDaoEntity(
        domain.getVariation()
      )
    }

    return price
  }
}
