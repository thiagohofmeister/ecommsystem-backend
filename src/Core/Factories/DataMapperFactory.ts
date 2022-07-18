import { ProductDataMapper } from '../../Product/DataMappers/ProductDataMapper'

export class DataMapperFactory {
  public createProductDataMapper() {
    return new ProductDataMapper()
  }
}
