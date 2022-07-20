import { DataSource, EntityManager } from 'typeorm'
import { CategoryCreateService } from '../../Category/Services/CategoryCreateService'
import { CategoryValidator } from '../../Category/Validators/CategoryValidator'
import { TransactionalService } from '../../Core/Services/TransactionalService'
import { ProductCreateService } from '../../Product/Services/ProductCreateService'
import { ProductSaveService } from '../../Product/Services/ProductSaveService'
import { ProductValidator } from '../../Product/Validators/ProductValidator'
import { RepositoryFactory } from './RepositoryFactory'

export class ServiceFactory {
  constructor(
    private readonly repositoryFactory: RepositoryFactory,
    private readonly dataSource: DataSource
  ) {}

  public buildProductSaveService(manager?: EntityManager) {
    if (!manager) manager = this.dataSource.manager

    return new ProductSaveService(
      this.repositoryFactory.buildCategoryRepository(manager),
      this.repositoryFactory.buildProductRepository(manager)
    )
  }

  public buildProductCreateService(manager?: EntityManager) {
    if (!manager) manager = this.dataSource.manager

    return new ProductCreateService(
      this.repositoryFactory.buildProductRepository(manager),
      new ProductValidator(),
      this.buildProductSaveService()
    )
  }

  public buildCategoryCreateService(manager?: EntityManager) {
    if (!manager) manager = this.dataSource.manager

    return new CategoryCreateService(
      this.repositoryFactory.buildCategoryRepository(manager),
      new CategoryValidator()
    )
  }

  public buildTransactionalService() {
    return new TransactionalService(this.dataSource)
  }
}
