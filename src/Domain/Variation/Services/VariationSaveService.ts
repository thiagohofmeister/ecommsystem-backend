import { InvalidDataException } from '../../../Core/Models/Exceptions/InvalidDataException'
import { AttributeRepository } from '../../Attribute/Repositories/AttributeRepository'
import { Product } from '../../Product/Models/Product'
import { VariationSaveDto } from '../Dto/VariationSaveDto'
import { Variation } from '../Models/Variation'
import { VariationAttribute } from '../Models/VariationAttribute'
import { VariationRepository } from '../Repositories/VariationRepository'
import { VariationDeleteUnusedAttributesService } from './VariationDeleteUnusedAttributesService'

export class VariationSaveService {
  constructor(
    private readonly variationRepository: VariationRepository,
    private readonly attributeRepository: AttributeRepository,
    private readonly productDeleteUnUsedVariationAttributesService: VariationDeleteUnusedAttributesService
  ) {}

  async execute(
    product: Product | string,
    sku: string,
    data: VariationSaveDto,
    variation?: Variation,
    variationIndex: number = 0
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

    await this.fillAttributes(variationToSave, data.attributes, variationIndex)

    return this.variationRepository.save(variationToSave)
  }

  private async fillAttributes(
    variation: Variation,
    attributesDto: VariationSaveDto['attributes'],
    variationIndex?: number
  ) {
    const attrIdsDto = attributesDto?.map(attr => attr.attribute.id) || []

    variation.removeAttributes(attrIdsDto)

    await this.productDeleteUnUsedVariationAttributesService.execute(
      variation.getSku(),
      variation.getStoreId(),
      attrIdsDto
    )

    if (!attrIdsDto.length) {
      return
    }

    const attributes = await this.attributeRepository.findAllByIds(attrIdsDto)

    const invalidDataException = new InvalidDataException('Invalid data.')

    attributesDto.forEach((attrDto, index) => {
      const attr = attributes.find(
        attr => attr.getId() === attrDto.attribute.id
      )

      if (!attr.getValues().includes(attrDto.value)) {
        invalidDataException.addReason({
          id: `variations.${variationIndex}.attributes.${index}.value.${attrDto.value}.notFound`,
          message: `Field variations.${variationIndex}.attributes.${index}.value.${attrDto.value} not found.`
        })
        return
      }

      const varAttr = variation
        .getAttributes()
        ?.find(attr => attr.getAttribute().getId() === attrDto.attribute.id)

      if (!!varAttr) {
        varAttr.setValue(attrDto.value)
        return
      }

      variation.addAttribute(
        new VariationAttribute(
          variation.getStoreId(),
          attrDto.value,
          variation,
          attr
        )
      )
    })

    if (!!invalidDataException.getReasons().length) {
      throw invalidDataException
    }
  }

  private async getVariation(
    variation: Variation,
    product: Product,
    sku: string,
    data: VariationSaveDto
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
