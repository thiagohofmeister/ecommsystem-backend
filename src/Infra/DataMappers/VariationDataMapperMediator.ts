import { EntityDataMapperContract } from '../../Core/DataMappers/Contracts/EntityDataMapperContract'
import { Variation } from '../../Product/Models/Variation'
import { VariationDao } from '../Models/VariationDao'
import { ProductDataMapper } from './ProductDataMapper'
import { VariationDataMapper } from './VariationDataMapper'

export class VariationDataMapperMediator extends EntityDataMapperContract<
  Variation,
  VariationDao
> {
  constructor(
    private readonly variationDataMapper: VariationDataMapper,
    private readonly productDataMapper: ProductDataMapper
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

    return variation
  }

  toDaoEntity(domain: Variation): VariationDao {
    const variation = this.variationDataMapper.toDaoEntity(domain)

    if (domain.getProduct()) {
      variation.product = this.productDataMapper.toDaoEntity(
        domain.getProduct()
      )
    }

    return variation
  }
}
