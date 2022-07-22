import { EntityDataMapperContract } from '../../Core/DataMappers/Contracts/EntityDataMapperContract'
import { Product } from '../../Domain/Product/Models/Product'
import { ProductDao } from '../Models/ProductDao'
import { BrandDataMapper } from './BrandDataMapper'
import { CategoryDataMapper } from './CategoryDataMapper'
import { ProductDataMapper } from './ProductDataMapper'

export class ProductDataMapperMediator extends EntityDataMapperContract<
  Product,
  ProductDao
> {
  constructor(
    private readonly productDataMapper: ProductDataMapper,
    private readonly categoryDataMapper: CategoryDataMapper,
    private readonly brandDataMapper: BrandDataMapper
  ) {
    super()
  }

  toDomainEntity(entity: ProductDao): Product {
    const product = this.productDataMapper.toDomainEntity(entity)

    if (entity.category) {
      product.setCategory(
        this.categoryDataMapper.toDomainEntity(entity.category)
      )
    }

    if (entity.brand) {
      product.setBrand(this.brandDataMapper.toDomainEntity(entity.brand))
    }

    return product
  }

  toDaoEntity(domain: Product): ProductDao {
    const product = this.productDataMapper.toDaoEntity(domain)

    if (domain.getCategory()) {
      product.category = this.categoryDataMapper.toDaoEntity(
        domain.getCategory()
      )
    }

    if (domain.getBrand()) {
      product.brand = this.brandDataMapper.toDaoEntity(domain.getBrand())
    }

    return product
  }
}
