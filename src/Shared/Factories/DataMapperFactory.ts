import { AttributeDataMapper } from '../../Infra/DataMappers/AttributeDataMapper'
import { AuthenticationDataMapper } from '../../Infra/DataMappers/AuthenticationDataMapper'
import { BrandDataMapper } from '../../Infra/DataMappers/BrandDataMapper'
import { CategoryDataMapper } from '../../Infra/DataMappers/CategoryDataMapper'
import { CategoryTreeCacheDataMapper } from '../../Infra/DataMappers/CategoryTreeCacheDataMapper'
import { ImageDataMapper } from '../../Infra/DataMappers/ImageDataMapper'
import { PriceDataMapper } from '../../Infra/DataMappers/PriceDataMapper'
import { PriceDataMapperMediator } from '../../Infra/DataMappers/PriceDataMapperMediator'
import { ProductDataMapper } from '../../Infra/DataMappers/ProductDataMapper'
import { ProductDataMapperMediator } from '../../Infra/DataMappers/ProductDataMapperMediator'
import { StockDataMapper } from '../../Infra/DataMappers/StockDataMapper'
import { StockDataMapperMediator } from '../../Infra/DataMappers/StockDataMapperMediator'
import { StoreDataMapper } from '../../Infra/DataMappers/StoreDataMapper'
import { StoreDataMapperMediator } from '../../Infra/DataMappers/StoreDataMapperMediator'
import { UserDataMapper } from '../../Infra/DataMappers/UserDataMapper'
import { UserDataMapperMediator } from '../../Infra/DataMappers/UserDataMapperMediator'
import { VariationAttributeDataMapper } from '../../Infra/DataMappers/VariationAttributeDataMapper'
import { VariationAttributeDataMapperMediator } from '../../Infra/DataMappers/VariationAttributeDataMapperMediator'
import { VariationDataMapper } from '../../Infra/DataMappers/VariationDataMapper'
import { VariationDataMapperMediator } from '../../Infra/DataMappers/VariationDataMapperMediator'
import { WarehouseDataMapper } from '../../Infra/DataMappers/WarehouseDataMapper'

export class DataMapperFactory {
  public buildProductDataMapper() {
    return new ProductDataMapper()
  }

  public buildCategoryDataMapper() {
    return new CategoryDataMapper()
  }

  public buildBrandDataMapper() {
    return new BrandDataMapper()
  }

  public buildWarehouseDataMapper() {
    return new WarehouseDataMapper()
  }

  public buildAttributeDataMapper() {
    return new AttributeDataMapper()
  }

  public buildProductDataMapperMediator() {
    return new ProductDataMapperMediator(
      this.buildProductDataMapper(),
      this.buildCategoryDataMapper(),
      this.buildBrandDataMapper(),
      this.buildVariationDataMapperMediator(),
      this.buildImageDataMapper()
    )
  }

  public buildCategoryTreeCacheDataMapper() {
    return new CategoryTreeCacheDataMapper()
  }

  public buildVariationDataMapper() {
    return new VariationDataMapper()
  }

  public buildImageDataMapper() {
    return new ImageDataMapper()
  }

  public buildPriceDataMapper() {
    return new PriceDataMapper()
  }

  public buildPriceDataMapperMediator() {
    return new PriceDataMapperMediator(this.buildPriceDataMapper(), this.buildVariationDataMapper())
  }

  public buildVariationAttributeDataMapper() {
    return new VariationAttributeDataMapper()
  }

  public buildVariationAttributeDataMapperMediator() {
    return new VariationAttributeDataMapperMediator(
      this.buildVariationAttributeDataMapper(),
      this.buildAttributeDataMapper(),
      this.buildVariationDataMapper()
    )
  }

  public buildStockDataMapper() {
    return new StockDataMapper()
  }

  public buildStockDataMapperMediator() {
    return new StockDataMapperMediator(
      this.buildStockDataMapper(),
      this.buildWarehouseDataMapper(),
      this.buildVariationDataMapper()
    )
  }

  public buildVariationDataMapperMediator() {
    return new VariationDataMapperMediator(
      this.buildVariationDataMapper(),
      this.buildProductDataMapper(),
      this.buildVariationAttributeDataMapperMediator(),
      this.buildStockDataMapperMediator(),
      this.buildPriceDataMapperMediator()
    )
  }

  public buildUserDataMapper() {
    return new UserDataMapper()
  }

  public buildStoreDataMapper() {
    return new StoreDataMapper()
  }

  public buildStoreDataMapperMediator() {
    return new StoreDataMapperMediator(this.buildStoreDataMapper(), this.buildUserDataMapper())
  }

  public buildUserDataMapperMediator() {
    return new UserDataMapperMediator(this.buildUserDataMapper(), this.buildStoreDataMapper())
  }

  public buildAuthenticationDataMapper() {
    return new AuthenticationDataMapper()
  }
}
