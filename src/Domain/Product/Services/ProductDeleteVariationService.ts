import { In } from 'typeorm'
import { VariationRepository } from '../Repositories/VariationRepository'

export class ProductDeleteVariationService {
  constructor(private readonly variationRepository: VariationRepository) {}

  public async execute(
    productId: string,
    storeId: string,
    sku: string | string[]
  ) {
    if (typeof sku === 'string') {
      return this.variationRepository.delete({
        sku,
        product: { id: productId, storeId }
      })
    }

    return this.variationRepository.delete({
      sku: In(sku),
      product: { id: productId, storeId }
    })
  }
}
