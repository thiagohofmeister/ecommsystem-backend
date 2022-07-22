import { BrandFacade } from '../../Domain/Brand/BrandFacade'
import { CategoryFacade } from '../../Domain/Category/CategoryFacade'
import { ProductFacade } from '../../Domain/Product/ProductFacade'
import { ServiceFactory } from './ServiceFactory'

export class FacadeFactory {
  constructor(private readonly serviceFactory: ServiceFactory) {}

  public buildCategoryFacade() {
    return new CategoryFacade(this.serviceFactory)
  }

  public buildBrandFacade() {
    return new BrandFacade(this.serviceFactory)
  }

  public buildProductFacade() {
    return new ProductFacade(this.serviceFactory)
  }
}
