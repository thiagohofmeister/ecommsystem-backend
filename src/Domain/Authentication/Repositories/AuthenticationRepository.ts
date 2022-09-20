import { IRepository, RedisCollection } from 'ecommsystem-core'

export interface AuthenticationRepository
  extends IRepository<RedisCollection<any[]>> {}
