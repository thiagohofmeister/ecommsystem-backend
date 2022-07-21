import { IRepository } from '../../Core/Models/Interfaces/IRepository'
import { RedisCollection } from '../../Core/Models/RedisCollection'
import { CategoryTree } from '../Models/CategoryTree'

export interface CategoryTreeCacheRepository
  extends IRepository<RedisCollection<CategoryTree[]>> {}
