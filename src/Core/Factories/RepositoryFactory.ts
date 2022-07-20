import { EntityManager } from 'typeorm'
import { CategoryDataNotFound } from '../../Category/Exceptions/CategoryDataNotFound'
import { CategoryRepository } from '../../Category/Repositories/CategoryRepository'
import { CategoryDao } from '../../Infra/Models/CategoryDao'
import { ProductDao } from '../../Infra/Models/ProductDao'
import { CategoryRepositoryImpl } from '../../Infra/Repositories/CategoryRepositoryImpl'
import { ProductRepositoryImpl } from '../../Infra/Repositories/ProductRepositoryImpl'
import { ProductDataNotFound } from '../../Product/Exceptions/ProductDataNotFound'
import { ProductRepository } from '../../Product/Repositories/ProductRepository'
import { DataMapperFactory } from './DataMapperFactory'

export class RepositoryFactory {
  constructor(private readonly dataMapperFactory: DataMapperFactory) {}

  public buildCategoryRepository(manager: EntityManager): CategoryRepository {
    return new CategoryRepositoryImpl(
      manager.getRepository(CategoryDao),
      this.dataMapperFactory.buildCategoryDataMapper(),
      new CategoryDataNotFound()
    )
  }

  public buildProductRepository(manager: EntityManager): ProductRepository {
    return new ProductRepositoryImpl(
      manager.getRepository(ProductDao),
      this.dataMapperFactory.buildProductDataMapperMediator(),
      new ProductDataNotFound()
    )
  }
}
