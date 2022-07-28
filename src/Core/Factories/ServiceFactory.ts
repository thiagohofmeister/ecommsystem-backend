import { EntityManager } from 'typeorm'
import { BrandCreateService } from '../../Domain/Brand/Services/BrandCreateService'
import { BrandValidator } from '../../Domain/Brand/BrandValidator'

import { CategoryCreateService } from '../../Domain/Category/Services/CategoryCreateService'
import { CategoryGetTreeService } from '../../Domain/Category/Services/CategoryGetTreeService'
import { CategoryValidator } from '../../Domain/Category/CategoryValidator'
import { TransactionalService } from '../../Core/Services/TransactionalService'
import { ProductCreateService } from '../../Domain/Product/Services/ProductCreateService'
import { ProductDeleteVariationService } from '../../Domain/Product/Services/ProductDeleteVariationService'
import { ProductSaveService } from '../../Domain/Product/Services/ProductSaveService'
import { ProductSaveVariationService } from '../../Domain/Product/Services/ProductSaveVariationService'
import { ProductValidator } from '../../Domain/Product/ProductValidator'
import { QueueFactory } from './QueueFactory,'
import { RepositoryFactory } from './RepositoryFactory'
import { BrandGetListService } from '../../Domain/Brand/Services/BrandGetListService'
import { BrandGetOneByIdService } from '../../Domain/Brand/Services/BrandGetOneByIdService'
import { ProductGetOneByIdService } from '../../Domain/Product/Services/ProductGetOneByIdService'
import { ProductGetListService } from '../../Domain/Product/Services/ProductGetListService'
import { ProductUpdateService } from '../../Domain/Product/Services/ProductUpdateService'
import { CategoryGetOneByIdService } from '../../Domain/Category/Services/CategoryGetOneByIdService'

export class ServiceFactory {
  constructor(
    private readonly repositoryFactory: RepositoryFactory,
    private readonly queueFactory: QueueFactory
  ) {}

  public buildProductGetListService(manager?: EntityManager) {
    return new ProductGetListService(
      this.repositoryFactory.buildProductRepository(manager)
    )
  }

  public buildProductGetOneByIdService(manager?: EntityManager) {
    return new ProductGetOneByIdService(
      this.repositoryFactory.buildProductRepository(manager)
    )
  }

  public buildProductSaveService(manager?: EntityManager) {
    return new ProductSaveService(
      this.repositoryFactory.buildCategoryRepository(manager),
      this.repositoryFactory.buildBrandRepository(manager),
      this.repositoryFactory.buildProductRepository(manager),
      this.buildProductSaveVariationService(manager),
      this.buildProductDeleteVariationService(manager)
    )
  }

  public buildProductUpdateService(manager?: EntityManager) {
    return new ProductUpdateService(
      this.buildProductGetOneByIdService(manager),
      new ProductValidator(),
      this.buildProductSaveService(manager)
    )
  }

  public buildProductCreateService(manager?: EntityManager) {
    return new ProductCreateService(
      this.repositoryFactory.buildProductRepository(manager),
      new ProductValidator(),
      this.buildProductSaveService(manager)
    )
  }

  public buildBrandCreateService(manager?: EntityManager) {
    return new BrandCreateService(
      this.repositoryFactory.buildBrandRepository(manager),
      new BrandValidator()
    )
  }

  public buildBrandGetListService(manager?: EntityManager) {
    return new BrandGetListService(
      this.repositoryFactory.buildBrandRepository(manager)
    )
  }

  public buildBrandGetOneByIdService(manager?: EntityManager) {
    return new BrandGetOneByIdService(
      this.repositoryFactory.buildBrandRepository(manager)
    )
  }

  public buildCategoryCreateService(manager?: EntityManager) {
    return new CategoryCreateService(
      this.repositoryFactory.buildCategoryRepository(manager),
      new CategoryValidator(),
      this.queueFactory.buildCategoryQueue()
    )
  }

  public buildCategoryGetTreeService(manager?: EntityManager) {
    return new CategoryGetTreeService(
      this.repositoryFactory.buildCategoryRepository(manager),
      this.repositoryFactory.buildCategoryTreeCacheRepository(
        this.repositoryFactory.getRedisClient()
      )
    )
  }

  public buildCategoryGetOneByIdService(manager?: EntityManager) {
    return new CategoryGetOneByIdService(
      this.repositoryFactory.buildCategoryRepository(manager)
    )
  }

  public buildProductSaveVariationService(manager?: EntityManager) {
    return new ProductSaveVariationService(
      this.repositoryFactory.buildVariationRepository(manager)
    )
  }

  public buildProductDeleteVariationService(manager?: EntityManager) {
    return new ProductDeleteVariationService(
      this.repositoryFactory.buildVariationRepository(manager)
    )
  }

  public buildTransactionalService() {
    return new TransactionalService(this.repositoryFactory.getDataSource())
  }
}
