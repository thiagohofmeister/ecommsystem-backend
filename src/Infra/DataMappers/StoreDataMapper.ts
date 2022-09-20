import { EntityDataMapperContract } from 'ecommsystem-core'

import { Store } from '../../Domain/Store/Models/Store'
import { StoreDao } from '../Models/StoreDao'

export class StoreDataMapper extends EntityDataMapperContract<Store, StoreDao> {
  toDomainEntity(entity: StoreDao): Store {
    return new Store(
      entity.name,
      entity.documentType,
      entity.documentNumber,
      entity.documentName,
      entity.email,
      entity.phone,
      null,
      entity.id
    )
  }

  toDaoEntity(domain: Store): StoreDao {
    return new StoreDao(
      domain.getId(),
      domain.getName(),
      domain.getDocumentType(),
      domain.getDocumentNumber(),
      domain.getDocumentName(),
      domain.getEmail(),
      domain.getPhone(),
      null
    )
  }
}
