import { RedisClientType } from 'redis'
import { DataSource, EntityManager } from 'typeorm'

import { CategoryDataNotFound } from '../../Category/Exceptions/CategoryDataNotFound'
import { CategoryTreeCacheDataNotFound } from '../../Category/Exceptions/CategoryTreeCacheDataNotFound'
import { CategoryRepository } from '../../Category/Repositories/CategoryRepository'
import { CategoryTreeCacheRepository } from '../../Category/Repositories/CategoryTreeCacheRepository'
import { CategoryDao } from '../../Infra/Models/CategoryDao'
import { ProductDao } from '../../Infra/Models/ProductDao'
import { CategoryRepositoryImpl } from '../../Infra/Repositories/CategoryRepositoryImpl'
import { CategoryTreeCacheRepositoryImpl } from '../../Infra/Repositories/CategoryTreeCacheRepositoryImpl'
import { ProductRepositoryImpl } from '../../Infra/Repositories/ProductRepositoryImpl'
import { ProductDataNotFound } from '../../Product/Exceptions/ProductDataNotFound'
import { ProductRepository } from '../../Product/Repositories/ProductRepository'
import { DataMapperFactory } from './DataMapperFactory'

export class RepositoryFactory {
  constructor(
    private readonly dataMapperFactory: DataMapperFactory,
    private readonly dataSource: DataSource,
    private readonly redisClient: RedisClientType
  ) {}

  public buildCategoryRepository(manager?: EntityManager): CategoryRepository {
    if (!manager) manager = this.dataSource.manager

    return new CategoryRepositoryImpl(
      this.getManager(manager).getRepository(CategoryDao),
      this.dataMapperFactory.buildCategoryDataMapper(),
      new CategoryDataNotFound()
    )
  }

  public buildProductRepository(manager?: EntityManager): ProductRepository {
    return new ProductRepositoryImpl(
      this.getManager(manager).getRepository(ProductDao),
      this.dataMapperFactory.buildProductDataMapperMediator(),
      new ProductDataNotFound()
    )
  }

  public buildCategoryTreeCacheRepository(
    redisClient: RedisClientType
  ): CategoryTreeCacheRepository {
    return new CategoryTreeCacheRepositoryImpl(
      redisClient,
      this.dataMapperFactory.buildCategoryTreeCacheDataMapper(),
      new CategoryTreeCacheDataNotFound()
    )
  }

  public getDataSource() {
    return this.dataSource
  }

  public getRedisClient() {
    return this.redisClient
  }

  private getManager(manager?: EntityManager) {
    if (manager) return manager

    return this.dataSource.manager
  }
}
