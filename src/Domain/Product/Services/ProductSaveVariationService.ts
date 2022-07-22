import { ProductSaveVariationDto } from '../Dto/ProductSaveVariationDto'
import { Product } from '../Models/Product'
import { Variation } from '../Models/Variation'
import { VariationRepository } from '../Repositories/VariationRepository'

export class ProductSaveVariationService {
  constructor(private readonly variationRepository: VariationRepository) {}

  async execute(
    product: Product | string,
    sku: string,
    data: ProductSaveVariationDto
  ) {
    // If variable product is string, then it's the product id.
    // So, we need to find the product with this id
    if (typeof product === 'string') {
      throw new Error('Method not implemented.')
    }

    const variation = new Variation(
      sku,
      product.getStoreId(),
      data.width,
      data.length,
      data.height,
      data.weight,
      data.measuresUnit,
      data.weightUnit,
      product
    )

    await this.variationRepository.save(variation)

    return variation
  }
}
