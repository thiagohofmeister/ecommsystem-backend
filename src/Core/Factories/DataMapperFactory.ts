import { CategoryDataMapper } from '../../Infra/DataMappers/CategoryDataMapper'
import { CategoryTreeCacheDataMapper } from '../../Infra/DataMappers/CategoryTreeCacheDataMapper'
import { ProductDataMapper } from '../../Infra/DataMappers/ProductDataMapper'
import { ProductDataMapperMediator } from '../../Infra/DataMappers/ProductDataMapperMediator'

export class DataMapperFactory {
  public buildProductDataMapper() {
    return new ProductDataMapper()
  }

  public buildCategoryDataMapper() {
    return new CategoryDataMapper()
  }

  public buildProductDataMapperMediator() {
    return new ProductDataMapperMediator(
      this.buildProductDataMapper(),
      this.buildCategoryDataMapper()
    )
  }

  public buildCategoryTreeCacheDataMapper() {
    return new CategoryTreeCacheDataMapper()
  }
}
