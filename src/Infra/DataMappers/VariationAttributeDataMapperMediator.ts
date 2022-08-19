import { EntityDataMapperContract } from 'ecommsystem-core'
import { VariationAttribute } from '../../Domain/Variation/Models/VariationAttribute'
import { VariationAttributeDao } from '../Models/VariationAttributeDao'
import { AttributeDataMapper } from './AttributeDataMapper'
import { VariationAttributeDataMapper } from './VariationAttributeDataMapper'
import { VariationDataMapper } from './VariationDataMapper'

export class VariationAttributeDataMapperMediator extends EntityDataMapperContract<
  VariationAttribute,
  VariationAttributeDao
> {
  constructor(
    private readonly variationAttributeDataMapper: VariationAttributeDataMapper,
    private readonly attributeDataMapper: AttributeDataMapper,
    private readonly variationDataMapper: VariationDataMapper
  ) {
    super()
  }

  toDomainEntity(entity: VariationAttributeDao): VariationAttribute {
    const variationAttribute =
      this.variationAttributeDataMapper.toDomainEntity(entity)

    if (entity.variation) {
      variationAttribute.setVariation(
        this.variationDataMapper.toDomainEntity(entity.variation)
      )
    }

    if (entity.attribute) {
      variationAttribute.setAttribute(
        this.attributeDataMapper.toDomainEntity(entity.attribute)
      )
    }

    return variationAttribute
  }

  toDaoEntity(domain: VariationAttribute): VariationAttributeDao {
    const variationAttribute =
      this.variationAttributeDataMapper.toDaoEntity(domain)

    if (domain.getVariation()) {
      variationAttribute.variation = this.variationDataMapper.toDaoEntity(
        domain.getVariation()
      )
    }

    if (domain.getAttribute()) {
      variationAttribute.attribute = this.attributeDataMapper.toDaoEntity(
        domain.getAttribute()
      )
    }

    return variationAttribute
  }
}
