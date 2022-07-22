import { RedisClientType } from 'redis'
import { DataSource, EntityManager } from 'typeorm'

import { BrandDataNotFound } from '../../Domain/Brand/Exceptions/BrandDataNotFound'
import { BrandRepository } from '../../Domain/Brand/Repositories/BrandRepository'
import { CategoryDataNotFound } from '../../Domain/Category/Exceptions/CategoryDataNotFound'
import { CategoryTreeCacheDataNotFound } from '../../Domain/Category/Exceptions/CategoryTreeCacheDataNotFound'
import { CategoryRepository } from '../../Domain/Category/Repositories/CategoryRepository'
import { CategoryTreeCacheRepository } from '../../Domain/Category/Repositories/CategoryTreeCacheRepository'
import { ProductDataNotFound } from '../../Domain/Product/Exceptions/ProductDataNotFound'
import { VariationRepository } from '../../Domain/Product/Repositories/VariationRepository'
import { BrandDao } from '../../Infra/Models/BrandDao'
import { CategoryDao } from '../../Infra/Models/CategoryDao'
import { ProductDao } from '../../Infra/Models/ProductDao'
import { VariationDao } from '../../Infra/Models/VariationDao'
import { BrandRepositoryImpl } from '../../Infra/Repositories/BrandRepositoryImpl'
import { CategoryRepositoryImpl } from '../../Infra/Repositories/CategoryRepositoryImpl'
import { CategoryTreeCacheRepositoryImpl } from '../../Infra/Repositories/CategoryTreeCacheRepositoryImpl'
import { ProductRepositoryImpl } from '../../Infra/Repositories/ProductRepositoryImpl'
import { VariationRepositoryImpl } from '../../Infra/Repositories/VariationRepository'
import { DataMapperFactory } from './DataMapperFactory'

export class RepositoryFactory {
  constructor(
    private readonly dataMapperFactory: DataMapperFactory,
    private readonly dataSource: DataSource,
    private readonly redisClient: RedisClientType,
    private readonly storeId: string
  ) {}

  public buildCategoryRepository(manager?: EntityManager): CategoryRepository {
    if (!manager) manager = this.dataSource.manager

    return new CategoryRepositoryImpl(
      this.getManager(manager).getRepository(CategoryDao),
      this.dataMapperFactory.buildCategoryDataMapper(),
      this.storeId,
      new CategoryDataNotFound()
    )
  }

  public buildProductRepository(manager?: EntityManager) {
    return new ProductRepositoryImpl(
      this.getManager(manager).getRepository(ProductDao),
      this.dataMapperFactory.buildProductDataMapperMediator(),
      this.storeId,
      new ProductDataNotFound()
    )
  }

  public buildBrandRepository(manager?: EntityManager): BrandRepository {
    return new BrandRepositoryImpl(
      this.getManager(manager).getRepository(BrandDao),
      this.dataMapperFactory.buildBrandDataMapper(),
      this.storeId,
      new BrandDataNotFound()
    )
  }

  public buildCategoryTreeCacheRepository(
    redisClient: RedisClientType
  ): CategoryTreeCacheRepository {
    return new CategoryTreeCacheRepositoryImpl(
      redisClient,
      this.dataMapperFactory.buildCategoryTreeCacheDataMapper(),
      this.storeId,
      new CategoryTreeCacheDataNotFound()
    )
  }

  public buildVariationRepository(
    manager?: EntityManager
  ): VariationRepository {
    return new VariationRepositoryImpl(
      this.getManager(manager).getRepository(VariationDao),
      this.dataMapperFactory.buildVariationDataMapperMediator(),
      this.storeId,
      new ProductDataNotFound()
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
