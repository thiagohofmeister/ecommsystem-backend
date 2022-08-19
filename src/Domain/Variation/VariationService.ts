import { InvalidDataException } from 'ecommsystem-core'
import { In, Not } from 'typeorm'

import { AttributeRepository } from '../Attribute/Repositories/AttributeRepository'
import { Product } from '../Product/Models/Product'
import { WarehouseRepository } from '../Warehouse/Repositories/WarehouseRepository'
import { VariationSaveDto } from './Dto/VariationSaveDto'
import { VariationSavePricesDto } from './Dto/VariationSaveStocksDto'
import { Stock } from './Models/Stock'
import { Variation } from './Models/Variation'
import { VariationAttribute } from './Models/VariationAttribute'
import { StockRepository } from './Repositories/StockRepository'
import { VariationAttributeRepository } from './Repositories/VariationAttributeRepository'
import { VariationRepository } from './Repositories/VariationRepository'
import { VariationValidator } from './VariationValidator'

export class VariationService {
  constructor(
    private readonly variationRepository: VariationRepository,
    private readonly variationValidator: VariationValidator,
    private readonly variationAttributeRepository: VariationAttributeRepository,
    private readonly warehouseRepository: WarehouseRepository,
    private readonly stockRepository: StockRepository,
    private readonly attributeRepository: AttributeRepository
  ) {}

  public async delete(
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

  private async deleteUnusedAttributes(
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

  public async saveStocks(
    sku: string,
    storeId: string,
    data: VariationSavePricesDto[]
  ): Promise<Stock[]> {
    await this.variationValidator.variationSaveStocksPayloadValidate(data)

    const warehouses = await this.warehouseRepository.findByIds(
      data.map(stockDto => stockDto.warehouse.id)
    )

    const variation = await this.variationRepository.findOneByPrimaryColumn(sku)

    const stocks = await Promise.all(
      data.map(async stockDto => {
        const stock = new Stock(
          stockDto.quantity,
          storeId,
          variation,
          warehouses.find(
            warehouse => warehouse.getId() === stockDto.warehouse.id
          )
        )

        return this.stockRepository.save(stock, false)
      })
    )

    return stocks
  }

  public async create(
    product: Product | string,
    sku: string,
    data: VariationSaveDto,
    variationIndex: number = 0
  ) {
    return this.save(product, sku, data, null, variationIndex)
  }

  public async update(
    product: Product | string,
    sku: string,
    data: VariationSaveDto,
    variation?: Variation,
    variationIndex: number = 0
  ) {
    return this.save(product, sku, data, variation, variationIndex)
  }

  private async save(
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

    await this.deleteUnusedAttributes(
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

      if (!attr) {
        invalidDataException.addReason({
          id: `variations.${variationIndex}.attributes.${index}.id.${attrDto.attribute.id}.notFound`,
          message: `Field variations.${variationIndex}.attributes.${index}.id.${attrDto.attribute.id} not found.`
        })
        return
      }

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
