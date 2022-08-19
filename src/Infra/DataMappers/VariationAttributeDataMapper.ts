import { EntityDataMapperContract } from 'ecommsystem-core'
import { VariationAttribute } from '../../Domain/Variation/Models/VariationAttribute'
import { VariationAttributeDao } from '../Models/VariationAttributeDao'

export class VariationAttributeDataMapper extends EntityDataMapperContract<
  VariationAttribute,
  VariationAttributeDao
> {
  toDomainEntity(entity: VariationAttributeDao): VariationAttribute {
    return new VariationAttribute(entity.storeId, entity.value)
  }

  toDaoEntity(domain: VariationAttribute): VariationAttributeDao {
    return new VariationAttributeDao(domain.getStoreId(), domain.getValue())
  }
}
