import { EntityDataMapperContract } from '../../Core/DataMappers/Contracts/EntityDataMapperContract'
import { Variation } from '../../Domain/Product/Models/Variation'
import { VariationDao } from '../Models/VariationDao'
import { ProductDataMapper } from './ProductDataMapper'
import { VariationAttributeDataMapperMediator } from './VariationAttributeDataMapperMediator'
import { VariationDataMapper } from './VariationDataMapper'

export class VariationDataMapperMediator extends EntityDataMapperContract<
  Variation,
  VariationDao
> {
  constructor(
    private readonly variationDataMapper: VariationDataMapper,
    private readonly productDataMapper: ProductDataMapper,
    private readonly variationAttributeDataMapperMediator: VariationAttributeDataMapperMediator
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

    return variation
  }
}
