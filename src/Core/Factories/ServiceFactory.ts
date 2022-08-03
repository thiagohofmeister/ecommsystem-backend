import { EntityManager } from 'typeorm'

import { TransactionalService } from '../../Core/Services/TransactionalService'
import { AttributeValidator } from '../../Domain/Attribute/AttributeValidator'
import { AttributeCreateService } from '../../Domain/Attribute/Services/AttributeCreateService'
import { AttributeGetListService } from '../../Domain/Attribute/Services/AttributeGetListService'
import { AttributeGetOneByIdService } from '../../Domain/Attribute/Services/AttributeGetOneByIdService'
import { AttributeSaveService } from '../../Domain/Attribute/Services/AttributeSaveService'
import { AttributeUpdateService } from '../../Domain/Attribute/Services/AttributeUpdateService'
import { BrandValidator } from '../../Domain/Brand/BrandValidator'
import { BrandCreateService } from '../../Domain/Brand/Services/BrandCreateService'
import { BrandGetListService } from '../../Domain/Brand/Services/BrandGetListService'
import { BrandGetOneByIdService } from '../../Domain/Brand/Services/BrandGetOneByIdService'
import { BrandSaveService } from '../../Domain/Brand/Services/BrandSaveService'
import { BrandUpdateService } from '../../Domain/Brand/Services/BrandUpdateService'
import { CategoryValidator } from '../../Domain/Category/CategoryValidator'
import { CategoryCreateService } from '../../Domain/Category/Services/CategoryCreateService'
import { CategoryGetOneByIdService } from '../../Domain/Category/Services/CategoryGetOneByIdService'
import { CategoryGetTreeService } from '../../Domain/Category/Services/CategoryGetTreeService'
import { CategorySaveService } from '../../Domain/Category/Services/CategorySaveService'
import { CategoryUpdateService } from '../../Domain/Category/Services/CategoryUpdateService'
import { ProductValidator } from '../../Domain/Product/ProductValidator'
import { ProductCreateService } from '../../Domain/Product/Services/ProductCreateService'
import { ProductDeleteUnusedImagesService } from '../../Domain/Product/Services/ProductDeleteUnusedImagesService'
import { VariationDeleteUnusedAttributesService } from '../../Domain/Variation/Services/VariationDeleteUnusedAttributesService'
import { VariationDeleteService } from '../../Domain/Variation/Services/VariationDeleteService'
import { ProductGetListService } from '../../Domain/Product/Services/ProductGetListService'
import { ProductGetOneByIdService } from '../../Domain/Product/Services/ProductGetOneByIdService'
import { ProductSaveService } from '../../Domain/Product/Services/ProductSaveService'
import { VariationSaveService } from '../../Domain/Variation/Services/VariationSaveService'
import { ProductUpdateService } from '../../Domain/Product/Services/ProductUpdateService'
import { QueueFactory } from './QueueFactory'
import { RepositoryFactory } from './RepositoryFactory'
import { ProductSavePricesService } from '../../Domain/Product/Services/ProductSavePricesService'
import { WarehouseValidator } from '../../Domain/Warehouse/WarehouseValidator'
import { WarehouseCreateService } from '../../Domain/Warehouse/Services/WarehouseCreateService'
import { WarehouseUpdateService } from '../../Domain/Warehouse/Services/WarehouseUpdateService'
import { WarehouseSaveService } from '../../Domain/Warehouse/Services/WarehouseSaveService'
import { WarehouseGetListService } from '../../Domain/Warehouse/Services/WarehouseGetListService'
import { WarehouseGetOneByIdService } from '../../Domain/Warehouse/Services/WarehouseGetOneByIdService'
import { WarehouseSavePriorityService } from '../../Domain/Warehouse/Services/WarehouseSavePriorityService'

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
      this.repositoryFactory.buildAttributeRepository(manager),
      this.repositoryFactory.buildCategoryRepository(manager),
      this.repositoryFactory.buildBrandRepository(manager),
      this.repositoryFactory.buildProductRepository(manager),
      this.buildVariationSaveService(manager),
      this.buildVariationDeleteService(manager),
      this.buildProductDeleteUnusedImagesService(manager)
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
      this.buildBrandSaveService(manager),
      new BrandValidator()
    )
  }

  public buildBrandUpdateService(manager?: EntityManager) {
    return new BrandUpdateService(
      this.buildBrandSaveService(manager),
      this.buildBrandGetOneByIdService(manager),
      new BrandValidator()
    )
  }

  public buildBrandSaveService(manager?: EntityManager) {
    return new BrandSaveService(
      this.repositoryFactory.buildBrandRepository(manager)
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

  public buildWarehouseSavePriorityService(manager?: EntityManager) {
    return new WarehouseSavePriorityService(
      this.buildWarehouseGetListService(manager),
      this.buildWarehouseSaveService(manager),
      this.buildWarehouseGetOneByIdService(manager),
      new WarehouseValidator()
    )
  }

  public buildWarehouseCreateService(manager?: EntityManager) {
    return new WarehouseCreateService(
      this.repositoryFactory.buildWarehouseRepository(),
      this.buildWarehouseSaveService(manager),
      new WarehouseValidator()
    )
  }

  public buildWarehouseUpdateService(manager?: EntityManager) {
    return new WarehouseUpdateService(
      this.buildWarehouseSaveService(manager),
      this.buildWarehouseGetOneByIdService(manager),
      new WarehouseValidator()
    )
  }

  public buildWarehouseSaveService(manager?: EntityManager) {
    return new WarehouseSaveService(
      this.repositoryFactory.buildWarehouseRepository(manager)
    )
  }

  public buildWarehouseGetListService(manager?: EntityManager) {
    return new WarehouseGetListService(
      this.repositoryFactory.buildWarehouseRepository(manager)
    )
  }

  public buildWarehouseGetOneByIdService(manager?: EntityManager) {
    return new WarehouseGetOneByIdService(
      this.repositoryFactory.buildWarehouseRepository(manager)
    )
  }

  public buildAttributeCreateService(manager?: EntityManager) {
    return new AttributeCreateService(
      this.buildAttributeSaveService(manager),
      new AttributeValidator()
    )
  }

  public buildAttributeUpdateService(manager?: EntityManager) {
    return new AttributeUpdateService(
      this.buildAttributeSaveService(manager),
      this.buildAttributeGetOneByIdService(manager),
      new AttributeValidator()
    )
  }

  public buildAttributeSaveService(manager?: EntityManager) {
    return new AttributeSaveService(
      this.repositoryFactory.buildAttributeRepository(manager)
    )
  }

  public buildAttributeGetListService(manager?: EntityManager) {
    return new AttributeGetListService(
      this.repositoryFactory.buildAttributeRepository(manager)
    )
  }

  public buildAttributeGetOneByIdService(manager?: EntityManager) {
    return new AttributeGetOneByIdService(
      this.repositoryFactory.buildAttributeRepository(manager)
    )
  }

  public buildCategoryCreateService(manager?: EntityManager) {
    return new CategoryCreateService(
      this.buildCategorySaveService(manager),
      new CategoryValidator()
    )
  }

  public buildCategoryUpdateService(manager?: EntityManager) {
    return new CategoryUpdateService(
      this.buildCategorySaveService(manager),
      this.buildCategoryGetOneByIdService(manager),
      new CategoryValidator()
    )
  }

  public buildCategorySaveService(manager?: EntityManager) {
    return new CategorySaveService(
      this.repositoryFactory.buildCategoryRepository(manager),
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

  public buildVariationSaveService(manager?: EntityManager) {
    return new VariationSaveService(
      this.repositoryFactory.buildVariationRepository(manager),
      this.repositoryFactory.buildAttributeRepository(manager),
      this.buildVariationDeleteUnusedAttributesService(manager)
    )
  }

  public buildProductDeleteUnusedImagesService(manager?: EntityManager) {
    return new ProductDeleteUnusedImagesService(
      this.repositoryFactory.buildImageRepository(manager)
    )
  }

  public buildProductSavePricesService(manager?: EntityManager) {
    return new ProductSavePricesService(
      this.repositoryFactory.buildPriceRepository(manager),
      this.repositoryFactory.buildProductRepository(manager),
      new ProductValidator()
    )
  }

  public buildVariationDeleteUnusedAttributesService(manager?: EntityManager) {
    return new VariationDeleteUnusedAttributesService(
      this.repositoryFactory.buildVariationAttributeRepository(manager)
    )
  }

  public buildVariationDeleteService(manager?: EntityManager) {
    return new VariationDeleteService(
      this.repositoryFactory.buildVariationRepository(manager)
    )
  }

  public buildTransactionalService() {
    return new TransactionalService(this.repositoryFactory.getDataSource())
  }
}
