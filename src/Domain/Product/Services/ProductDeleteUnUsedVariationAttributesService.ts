import { In, Not } from 'typeorm'

import { VariationAttributeRepository } from '../Repositories/VariationAttributeRepository'

export class ProductDeleteUnUsedVariationAttributesService {
  constructor(
    private readonly variationAttributeRepository: VariationAttributeRepository
  ) {}

  public async execute(
    sku: string,
    storeId: string,
    idsToKeep: string | string[]
  ) {
    if (typeof idsToKeep === 'string') {
      idsToKeep = [idsToKeep]
    }

    return this.variationAttributeRepository.delete({
      attribute: { id: Not(In(idsToKeep)) },
      variation: { sku },
      attributeId: Not(In(idsToKeep)),
      variationSku: sku,
      storeId
    })
  }
}
