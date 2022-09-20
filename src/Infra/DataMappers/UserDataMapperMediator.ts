import { EntityDataMapperContract } from 'ecommsystem-core'

import { User } from '../../Domain/User/Models/User'
import { UserDao } from '../Models/UserDao'
import { StoreDataMapper } from './StoreDataMapper'
import { UserDataMapper } from './UserDataMapper'

export class UserDataMapperMediator extends EntityDataMapperContract<
  User,
  UserDao
> {
  constructor(
    private readonly userDataMapper: UserDataMapper,
    private readonly storeDataMapper: StoreDataMapper
  ) {
    super()
  }

  toDomainEntity(entity: UserDao): User {
    const user = this.userDataMapper.toDomainEntity(entity)

    if (entity.storesOwned) {
      user.removeStoresOwned([])
      this.storeDataMapper
        .toDomainEntityMany(entity.storesOwned)
        .map(store => user.addStoreOwned(store))
    }

    return user
  }

  toDaoEntity(domain: User): UserDao {
    const user = this.userDataMapper.toDaoEntity(domain)

    if (domain.getStoresOwned()) {
      user.storesOwned = this.storeDataMapper.toDaoEntityMany(
        domain.getStoresOwned()
      )
    }

    return user
  }
}
