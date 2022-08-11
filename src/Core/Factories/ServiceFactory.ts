import { EntityManager } from 'typeorm'

import { TransactionalService } from '../../Core/Services/TransactionalService'
import { AttributeService } from '../../Domain/Attribute/AttributeService'
import { AttributeValidator } from '../../Domain/Attribute/AttributeValidator'
import { BrandService } from '../../Domain/Brand/BrandService'
import { BrandValidator } from '../../Domain/Brand/BrandValidator'
import { CategoryService } from '../../Domain/Category/CategoryService'
import { CategoryValidator } from '../../Domain/Category/CategoryValidator'
import { EndpointPermissionsService } from '../../Domain/EndpointPermissions/EndpointPermissionsService'
import { ProductService } from '../../Domain/Product/ProductService'
import { ProductValidator } from '../../Domain/Product/ProductValidator'
import { VariationService } from '../../Domain/Variation/VariationService'
import { VariationValidator } from '../../Domain/Variation/VariationValidator'
import { WarehouseService } from '../../Domain/Warehouse/WarehouseService'
import { WarehouseValidator } from '../../Domain/Warehouse/WarehouseValidator'
import { QueueFactory } from './QueueFactory'
import { RepositoryFactory } from './RepositoryFactory'

export class ServiceFactory {
  constructor(
    private readonly repositoryFactory: RepositoryFactory,
    private readonly queueFactory: QueueFactory
  ) {}

  public buildProductService(manager?: EntityManager) {
    return new ProductService(
      this.repositoryFactory.buildProductRepository(manager),
      new ProductValidator(),
      this.repositoryFactory.buildPriceRepository(manager),
      this.repositoryFactory.buildImageRepository(manager),
      this.repositoryFactory.buildAttributeRepository(manager),
      this.repositoryFactory.buildBrandRepository(manager),
      this.repositoryFactory.buildCategoryRepository(manager),
      this.buildVariationService(manager)
    )
  }

  public buildBrandService(manager?: EntityManager) {
    return new BrandService(
      this.repositoryFactory.buildBrandRepository(manager),
      new BrandValidator()
    )
  }

  public buildWarehouseService(manager?: EntityManager) {
    return new WarehouseService(
      this.repositoryFactory.buildWarehouseRepository(manager),
      new WarehouseValidator()
    )
  }

  public buildAttributeService(manager?: EntityManager) {
    return new AttributeService(
      this.repositoryFactory.buildAttributeRepository(manager),
      new AttributeValidator()
    )
  }

  public buildCategoryService(manager?: EntityManager) {
    return new CategoryService(
      this.repositoryFactory.buildCategoryRepository(manager),
      new CategoryValidator(),
      this.queueFactory.buildCategoryQueue(),
      this.repositoryFactory.buildCategoryTreeCacheRepository()
    )
  }

  public buildVariationService(manager?: EntityManager) {
    return new VariationService(
      this.repositoryFactory.buildVariationRepository(manager),
      new VariationValidator(),
      this.repositoryFactory.buildVariationAttributeRepository(manager),
      this.repositoryFactory.buildWarehouseRepository(manager),
      this.repositoryFactory.buildStockRepository(manager),
      this.repositoryFactory.buildAttributeRepository(manager)
    )
  }

  public buildEndpointPermissionsService() {
    return new EndpointPermissionsService()
  }

  public buildTransactionalService() {
    return new TransactionalService(this.repositoryFactory.getDataSource())
  }
}
