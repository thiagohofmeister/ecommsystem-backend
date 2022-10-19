import { AttributeFacade } from '../../Domain/Attribute/AttributeFacade'
import { AuthenticationFacade } from '../../Domain/Authentication/AuthenticationFacade'
import { BrandFacade } from '../../Domain/Brand/BrandFacade'
import { CategoryFacade } from '../../Domain/Category/CategoryFacade'
import { EndpointPermissionsFacade } from '../../Domain/EndpointPermissions/EndpointPermissionsFacade'
import { ProductFacade } from '../../Domain/Product/ProductFacade'
import { RegisterFacade } from '../../Domain/Register/RegisterFacade'
import { UserFacade } from '../../Domain/User/UserFacade'
import { VariationFacade } from '../../Domain/Variation/VariationFacade'
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

  public buildVariationFacade() {
    return new VariationFacade(this.serviceFactory)
  }

  public buildEndpointPermissionsFacade() {
    return new EndpointPermissionsFacade(this.serviceFactory)
  }

  public buildRegisterFacade() {
    return new RegisterFacade(this.serviceFactory)
  }

  public buildAuthenticationFacade() {
    return new AuthenticationFacade(this.serviceFactory)
  }

  public buildUserFacade() {
    return new UserFacade(this.serviceFactory)
  }
}
