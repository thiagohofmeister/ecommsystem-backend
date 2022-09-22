import { EntityDataMapperContract } from 'ecommsystem-core'

import { Product } from '../../Domain/Product/Models/Product'
import { ProductDao } from '../Models/ProductDao'
import { BrandDataMapper } from './BrandDataMapper'
import { CategoryDataMapper } from './CategoryDataMapper'
import { ImageDataMapper } from './ImageDataMapper'
import { ProductDataMapper } from './ProductDataMapper'
import { VariationDataMapperMediator } from './VariationDataMapperMediator'

export class ProductDataMapperMediator extends EntityDataMapperContract<Product, ProductDao> {
  constructor(
    private readonly productDataMapper: ProductDataMapper,
    private readonly categoryDataMapper: CategoryDataMapper,
    private readonly brandDataMapper: BrandDataMapper,
    private readonly variationDataMapperMediator: VariationDataMapperMediator,
    private readonly imageDataMapper: ImageDataMapper
  ) {
    super()
  }

  toDomainEntity(entity: ProductDao): Product {
    const product = this.productDataMapper.toDomainEntity(entity)

    if (entity.category) {
      product.setCategory(this.categoryDataMapper.toDomainEntity(entity.category))
    }

    if (entity.brand) {
      product.setBrand(this.brandDataMapper.toDomainEntity(entity.brand))
    }

    if (entity.variations) {
      product.removeVariations([])
      entity.variations.forEach(variation =>
        product.addVariation(this.variationDataMapperMediator.toDomainEntity(variation))
      )
    }

    if (entity.images) {
      product.removeImages([])
      entity.images.forEach(image => product.addImage(this.imageDataMapper.toDomainEntity(image)))
    }

    if (entity.images && entity.variations) {
      product.fillVariationsImages()
    }

    return product
  }

  toDaoEntity(domain: Product): ProductDao {
    const product = this.productDataMapper.toDaoEntity(domain)

    if (domain.getCategory()) {
      product.category = this.categoryDataMapper.toDaoEntity(domain.getCategory())
    }

    if (domain.getBrand()) {
      product.brand = this.brandDataMapper.toDaoEntity(domain.getBrand())
    }

    if (domain.getImages()) {
      product.images = this.imageDataMapper.toDaoEntityMany(domain.getImages())
    }

    return product
  }
}
