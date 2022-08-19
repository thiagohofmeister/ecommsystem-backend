import { EntityDataMapperContract } from 'ecommsystem-core'

import { Attribute } from '../../Domain/Attribute/Models/Attribute'
import { AttributeDao } from '../Models/AttributeDao'

export class AttributeDataMapper extends EntityDataMapperContract<
  Attribute,
  AttributeDao
> {
  toDomainEntity(entity: AttributeDao): Attribute {
    return new Attribute(entity.storeId, entity.label, entity.values, entity.id)
  }

  toDaoEntity(domain: Attribute): AttributeDao {
    return new AttributeDao(
      domain.getId(),
      domain.getStoreId(),
      domain.getLabel(),
      domain.getValues()
    )
  }
}
