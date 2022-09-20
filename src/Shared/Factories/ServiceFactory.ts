import { JWT, TransactionalService } from 'ecommsystem-core'
import { EntityManager } from 'typeorm'

import { AttributeService } from '../../Domain/Attribute/AttributeService'
import { AttributeValidator } from '../../Domain/Attribute/AttributeValidator'
import { AuthenticationService } from '../../Domain/Authentication/AuthenticationService'
import { BrandService } from '../../Domain/Brand/BrandService'
import { BrandValidator } from '../../Domain/Brand/BrandValidator'
import { CategoryService } from '../../Domain/Category/CategoryService'
import { CategoryValidator } from '../../Domain/Category/CategoryValidator'
import { EndpointPermissionsService } from '../../Domain/EndpointPermissions/EndpointPermissionsService'
import { ProductService } from '../../Domain/Product/ProductService'
import { ProductValidator } from '../../Domain/Product/ProductValidator'
import { RegisterService } from '../../Domain/Register/RegisterService'
import { RegisterValidator } from '../../Domain/Register/RegisterValidator'
import { StoreService } from '../../Domain/Store/StoreService'
import { StoreValidator } from '../../Domain/Store/StoreValidator'
import { UserService } from '../../Domain/User/UserService'
import { UserValidator } from '../../Domain/User/UserValidator'
import { VariationService } from '../../Domain/Variation/VariationService'
import { VariationValidator } from '../../Domain/Variation/VariationValidator'
import { WarehouseService } from '../../Domain/Warehouse/WarehouseService'
import { WarehouseValidator } from '../../Domain/Warehouse/WarehouseValidator'
import { QueueFactory } from './QueueFactory'
import { RepositoryFactory } from './RepositoryFactory'

export class ServiceFactory {
  constructor(private readonly repositoryFactory: RepositoryFactory, private readonly queueFactory: QueueFactory) {}

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
    return new BrandService(this.repositoryFactory.buildBrandRepository(manager), new BrandValidator())
  }

  public buildWarehouseService(manager?: EntityManager) {
    return new WarehouseService(this.repositoryFactory.buildWarehouseRepository(manager), new WarehouseValidator())
  }

  public buildAttributeService(manager?: EntityManager) {
    return new AttributeService(this.repositoryFactory.buildAttributeRepository(manager), new AttributeValidator())
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

  public buildAuthenticationService(manager?: EntityManager) {
    return new AuthenticationService(
      this.repositoryFactory.buildAuthenticationRepository(),
      this.buildUserService(manager),
      this.buildEndpointPermissionsService(),
      new JWT(process.env.JWT_KEY)
    )
  }

  public buildRegisterService(manager?: EntityManager) {
    return new RegisterService(this.buildUserService(manager), this.buildStoreService(manager), new RegisterValidator())
  }

  public buildUserService(manager?: EntityManager) {
    return new UserService(this.repositoryFactory.buildUserRepository(manager), new UserValidator())
  }

  public buildStoreService(manager?: EntityManager) {
    return new StoreService(this.repositoryFactory.buildStoreRepository(manager), new StoreValidator())
  }

  public buildTransactionalService() {
    return new TransactionalService(this.repositoryFactory.getDataSource())
  }
}
