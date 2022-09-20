import { EntityDataMapperContract } from 'ecommsystem-core'

export class AuthenticationDataMapper extends EntityDataMapperContract<[], []> {
  toDomainEntity(entity: []): [] {
    return entity
  }

  toDaoEntity(domain: []): [] {
    return domain
  }
}
