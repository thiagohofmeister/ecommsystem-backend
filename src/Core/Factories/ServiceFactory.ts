import { EntityManager } from 'typeorm'

import { CategoryCreateService } from '../../Category/Services/CategoryCreateService'
import { CategoryGetTreeService } from '../../Category/Services/CategoryGetTreeService'
import { CategoryValidator } from '../../Category/Validators/CategoryValidator'
import { TransactionalService } from '../../Core/Services/TransactionalService'
import { ProductCreateService } from '../../Product/Services/ProductCreateService'
import { ProductSaveService } from '../../Product/Services/ProductSaveService'
import { ProductSaveVariationService } from '../../Product/Services/ProductSaveVariationService'
import { ProductValidator } from '../../Product/Validators/ProductValidator'
import { QueueFactory } from './QueueFactory,'
import { RepositoryFactory } from './RepositoryFactory'

export class ServiceFactory {
  constructor(
    private readonly repositoryFactory: RepositoryFactory,
    private readonly queueFactory: QueueFactory
  ) {}

  public buildProductSaveService(manager?: EntityManager) {
    return new ProductSaveService(
      this.repositoryFactory.buildCategoryRepository(manager),
      this.repositoryFactory.buildProductRepository(manager),
      this.buildProductSaveVariationService(manager)
    )
  }

  public buildProductCreateService(manager?: EntityManager) {
    return new ProductCreateService(
      this.repositoryFactory.buildProductRepository(manager),
      new ProductValidator(),
      this.buildProductSaveService(manager)
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

  public buildProductSaveVariationService(manager?: EntityManager) {
    return new ProductSaveVariationService(
      this.repositoryFactory.buildVariationRepository(manager)
    )
  }

  public buildTransactionalService() {
    return new TransactionalService(this.repositoryFactory.getDataSource())
  }
}
