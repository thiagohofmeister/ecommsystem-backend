import { CategoryTree } from '../../Category/Models/CategoryTree'
import { CategoryTreeCacheRepository } from '../../Category/Repositories/CategoryTreeCacheRepository'
import { RedisClientRepositoryContract } from '../../Core/Repositories/Contracts/RedisClientRepositoryContract'

export class CategoryTreeCacheRepositoryImpl
  extends RedisClientRepositoryContract<CategoryTree[]>
  implements CategoryTreeCacheRepository
{
  protected getKeyPrefix(): string {
    return ''
  }
}
