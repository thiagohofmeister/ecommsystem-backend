import { EntityDataMapperContract } from 'ecommsystem-core'

import { User } from '../../Domain/User/Models/User'
import { UserDao } from '../Models/UserDao'

export class UserDataMapper extends EntityDataMapperContract<User, UserDao> {
  toDomainEntity(entity: UserDao): User {
    return new User(
      entity.name,
      entity.documentNumber,
      entity.email,
      entity.password,
      entity.status,
      entity.id
    )
  }

  toDaoEntity(domain: User): UserDao {
    return new UserDao(
      domain.getId(),
      domain.getName(),
      domain.getDocumentNumber(),
      domain.getEmail(),
      domain.getPassword(),
      domain.getStatus()
    )
  }
}
