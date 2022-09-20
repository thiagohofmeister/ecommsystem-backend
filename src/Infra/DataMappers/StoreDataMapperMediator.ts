import { EntityDataMapperContract } from 'ecommsystem-core'

import { Store } from '../../Domain/Store/Models/Store'
import { StoreDao } from '../Models/StoreDao'
import { StoreDataMapper } from './StoreDataMapper'
import { UserDataMapper } from './UserDataMapper'

export class StoreDataMapperMediator extends EntityDataMapperContract<
  Store,
  StoreDao
> {
  constructor(
    private readonly storeDataMapper: StoreDataMapper,
    private readonly userDataMapper: UserDataMapper
  ) {
    super()
  }

  toDomainEntity(entity: StoreDao): Store {
    const store = this.storeDataMapper.toDomainEntity(entity)

    if (entity.owner) {
      store.setOwner(this.userDataMapper.toDomainEntity(entity.owner))
    }

    return store
  }

  toDaoEntity(domain: Store): StoreDao {
    const store = this.storeDataMapper.toDaoEntity(domain)

    if (domain.getOwner()) {
      store.owner = this.userDataMapper.toDaoEntity(domain.getOwner())
    }

    return store
  }
}
