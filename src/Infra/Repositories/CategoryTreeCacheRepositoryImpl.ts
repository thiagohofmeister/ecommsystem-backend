import { RedisClientRepositoryContract } from 'ecommsystem-core'

import { CategoryTree } from '../../Domain/Category/Models/CategoryTree'
import { CategoryTreeCacheRepository } from '../../Domain/Category/Repositories/CategoryTreeCacheRepository'

export class CategoryTreeCacheRepositoryImpl
  extends RedisClientRepositoryContract<CategoryTree[]>
  implements CategoryTreeCacheRepository
{
  protected getKeyPrefix(): string {
    return ''
  }
}
