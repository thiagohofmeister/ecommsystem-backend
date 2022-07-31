import { AttributeFacade } from '../../Domain/Attribute/AttributeFacade'
import { BrandFacade } from '../../Domain/Brand/BrandFacade'
import { CategoryFacade } from '../../Domain/Category/CategoryFacade'
import { ProductFacade } from '../../Domain/Product/ProductFacade'
import { WarehouseFacade } from '../../Domain/Warehouse/WarehouseFacade'
import { ServiceFactory } from './ServiceFactory'

export class FacadeFactory {
  constructor(private readonly serviceFactory: ServiceFactory) {}

  public buildCategoryFacade() {
    return new CategoryFacade(this.serviceFactory)
  }

  public buildBrandFacade() {
    return new BrandFacade(this.serviceFactory)
  }

  public buildWarehouseFacade() {
    return new WarehouseFacade(this.serviceFactory)
  }

  public buildAttributeFacade() {
    return new AttributeFacade(this.serviceFactory)
  }

  public buildProductFacade() {
    return new ProductFacade(this.serviceFactory)
  }
}
