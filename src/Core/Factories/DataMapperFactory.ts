import { BrandDataMapper } from '../../Infra/DataMappers/BrandDataMapper'
import { CategoryDataMapper } from '../../Infra/DataMappers/CategoryDataMapper'
import { CategoryTreeCacheDataMapper } from '../../Infra/DataMappers/CategoryTreeCacheDataMapper'
import { ProductDataMapper } from '../../Infra/DataMappers/ProductDataMapper'
import { ProductDataMapperMediator } from '../../Infra/DataMappers/ProductDataMapperMediator'
import { VariationDataMapper } from '../../Infra/DataMappers/VariationDataMapper'
import { VariationDataMapperMediator } from '../../Infra/DataMappers/VariationDataMapperMediator'

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

  public buildProductDataMapperMediator() {
    return new ProductDataMapperMediator(
      this.buildProductDataMapper(),
      this.buildCategoryDataMapper(),
      this.buildBrandDataMapper()
    )
  }

  public buildCategoryTreeCacheDataMapper() {
    return new CategoryTreeCacheDataMapper()
  }

  public buildVariationDataMapper() {
    return new VariationDataMapper()
  }

  public buildVariationDataMapperMediator() {
    return new VariationDataMapperMediator(
      this.buildVariationDataMapper(),
      this.buildProductDataMapper()
    )
  }
}
