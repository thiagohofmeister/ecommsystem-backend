import { IRepository, RedisCollection } from 'ecommsystem-core'

import { CategoryTree } from '../Models/CategoryTree'

export interface CategoryTreeCacheRepository
  extends IRepository<RedisCollection<CategoryTree[]>> {}
