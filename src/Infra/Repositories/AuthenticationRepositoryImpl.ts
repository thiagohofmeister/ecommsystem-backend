import { RedisClientRepositoryContract } from 'ecommsystem-core'

import { AuthenticationRepository } from '../../Domain/Authentication/Repositories/AuthenticationRepository'

export class AuthenticationRepositoryImpl
  extends RedisClientRepositoryContract<[]>
  implements AuthenticationRepository
{
  protected getKeyPrefix(): string {
    return 'auth'
  }
}
