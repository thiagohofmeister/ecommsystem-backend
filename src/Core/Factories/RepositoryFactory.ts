import { RedisClientType } from 'redis'
import { DataSource, EntityManager } from 'typeorm'
import { AttributeDataNotFound } from '../../Domain/Attribute/Exceptions/AttributeDataNotFound'
import { AttributeRepository } from '../../Domain/Attribute/Repositories/AttributeRepository'

import { BrandDataNotFound } from '../../Domain/Brand/Exceptions/BrandDataNotFound'
import { BrandRepository } from '../../Domain/Brand/Repositories/BrandRepository'
import { CategoryDataNotFound } from '../../Domain/Category/Exceptions/CategoryDataNotFound'
import { CategoryTreeCacheDataNotFound } from '../../Domain/Category/Exceptions/CategoryTreeCacheDataNotFound'
import { CategoryRepository } from '../../Domain/Category/Repositories/CategoryRepository'
import { CategoryTreeCacheRepository } from '../../Domain/Category/Repositories/CategoryTreeCacheRepository'
import { ImageDataNotFound } from '../../Domain/Product/Exceptions/ImageDataNotFound'
import { ProductDataNotFound } from '../../Domain/Product/Exceptions/ProductDataNotFound'
import { VariationDataNotFound } from '../../Domain/Product/Exceptions/VariationDataNotFound'
import { ImageRepository } from '../../Domain/Product/Repositories/ImageRepository'
import { VariationRepository } from '../../Domain/Product/Repositories/VariationRepository'
import { AttributeDao } from '../../Infra/Models/AttributeDao'
import { BrandDao } from '../../Infra/Models/BrandDao'
import { CategoryDao } from '../../Infra/Models/CategoryDao'
import { ImageDao } from '../../Infra/Models/ImageDao'
import { ProductDao } from '../../Infra/Models/ProductDao'
import { VariationDao } from '../../Infra/Models/VariationDao'
import { AttributeRepositoryImpl } from '../../Infra/Repositories/AttributeRepositoryImpl'
import { BrandRepositoryImpl } from '../../Infra/Repositories/BrandRepositoryImpl'
import { CategoryRepositoryImpl } from '../../Infra/Repositories/CategoryRepositoryImpl'
import { CategoryTreeCacheRepositoryImpl } from '../../Infra/Repositories/CategoryTreeCacheRepositoryImpl'
import { ImageRepositoryImpl } from '../../Infra/Repositories/ImageRepository'
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
    return new CategoryRepositoryImpl(
      this.getManager(manager).getRepository(CategoryDao),
      this.dataMapperFactory.buildCategoryDataMapper(),
      this.storeId,
      new CategoryDataNotFound()
    )
  }

  public buildAttributeRepository(
    manager?: EntityManager
  ): AttributeRepository {
    return new AttributeRepositoryImpl(
      this.getManager(manager).getRepository(AttributeDao),
      this.dataMapperFactory.buildAttributeDataMapper(),
      this.storeId,
      new AttributeDataNotFound()
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

  public buildImageRepository(manager?: EntityManager): ImageRepository {
    return new ImageRepositoryImpl(
      this.getManager(manager).getRepository(ImageDao),
      this.dataMapperFactory.buildImageDataMapper(),
      this.storeId,
      new ImageDataNotFound()
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
      new VariationDataNotFound()
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
