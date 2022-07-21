import { CategoryFacade } from '../../Category/Facade/CategoryFacade'
import { ProductFacade } from '../../Product/Facade/ProductFacade'
import { ServiceFactory } from './ServiceFactory'

export class FacadeFactory {
  constructor(private readonly serviceFactory: ServiceFactory) {}

  public buildCategoryFacade() {
    return new CategoryFacade(this.serviceFactory)
  }

  public buildProductFacade() {
    return new ProductFacade(this.serviceFactory)
  }
}
