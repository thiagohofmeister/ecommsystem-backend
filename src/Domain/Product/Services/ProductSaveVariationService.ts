import { AttributeRepository } from '../../Attribute/Repositories/AttributeRepository'
import { ProductSaveVariationDto } from '../Dto/ProductSaveVariationDto'
import { Product } from '../Models/Product'
import { Variation } from '../Models/Variation'
import { VariationAttribute } from '../Models/VariationAttribute'
import { VariationRepository } from '../Repositories/VariationRepository'

export class ProductSaveVariationService {
  constructor(
    private readonly variationRepository: VariationRepository,
    private readonly attributeRepository: AttributeRepository
  ) {}

  async execute(
    product: Product | string,
    sku: string,
    data: ProductSaveVariationDto,
    variation?: Variation
  ) {
    // If variable product is string, then it's the product id.
    // So, we need to find the product with this id
    if (typeof product === 'string') {
      throw new Error('Method not implemented.')
    }

    const variationToSave = await this.getVariation(
      variation,
      product,
      sku,
      data
    )

    await this.fillAttributes(variationToSave, data.attributes)

    const variationSaved = await this.variationRepository.save(variationToSave)

    return variationSaved
  }

  private async fillAttributes(
    variationSaved: Variation,
    attributes: ProductSaveVariationDto['attributes']
  ) {
    await Promise.all(
      attributes.map(async attr => {
        // TODO: Validate if value used exists on attribute

        const variationAttribute = new VariationAttribute(
          variationSaved.getStoreId(),
          attr.value,
          variationSaved,
          await this.attributeRepository.findOneByPrimaryColumn(attr.id)
        )

        variationSaved.addAttribute(variationAttribute)
      })
    )
  }

  private async getVariation(
    variation: Variation,
    product: Product,
    sku: string,
    data: ProductSaveVariationDto
  ) {
    if (!variation) {
      return new Variation(
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
    }

    if (Object.keys(data).length === 1) {
      return variation
    }

    if (data.hasOwnProperty('width')) {
      variation.setWidth(data.width)
    }

    if (data.hasOwnProperty('length')) {
      variation.setLength(data.length)
    }

    if (data.hasOwnProperty('measuresUnit')) {
      variation.setMeasuresUnit(data.measuresUnit)
    }

    if (data.hasOwnProperty('weight')) {
      variation.setWeight(data.weight)
    }

    if (data.hasOwnProperty('weightUnit')) {
      variation.setWeightUnit(data.weightUnit)
    }

    if (data.hasOwnProperty('height')) {
      variation.setHeight(data.height)
    }

    return variation
  }
}
