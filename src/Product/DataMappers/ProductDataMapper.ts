import { ProductDao } from '../../Infra/Entities/Models/ProductDao'
import { Product } from '../Models/Product'
import { EntityDataMapperContract } from '../../Core/DataMappers/Contracts/EntityDataMapperContract'

export class ProductDataMapper extends EntityDataMapperContract<
  Product,
  ProductDao
> {
  toDomainEntity(entity: ProductDao): Product {
    return new Product(
      entity.title,
      '',
      0,
      0,
      0,
      0,
      null,
      entity.priceList,
      entity.priceSale
    )
  }

  toDaoEntity(domain: Product): ProductDao {
    return new ProductDao(
      domain.getTitle(),
      domain.getPriceList(),
      domain.getPriceSale(),
      domain.getId()
    )
  }
}
