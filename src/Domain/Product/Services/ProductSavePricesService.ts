import { In } from 'typeorm'
import { DataNotFoundException } from '../../../Core/Models/Exceptions/DataNotFoundException'

import { InvalidDataException } from '../../../Core/Models/Exceptions/InvalidDataException'
import { Variation } from '../../Variation/Models/Variation'
import { ProductSavePriceDto } from '../Dto/ProductSavePriceDto'
import { Price } from '../Models/Price'
import { Product } from '../Models/Product'
import { ProductValidator } from '../ProductValidator'
import { PriceRepository } from '../Repositories/PriceRepository'
import { ProductRepository } from '../Repositories/ProductRepository'

export class ProductSavePricesService {
  constructor(
    private readonly priceRepository: PriceRepository,
    private readonly productRepository: ProductRepository,
    private readonly productValidator: ProductValidator
  ) {}

  public async execute(
    productId: string,
    storeId: string,
    data: ProductSavePriceDto[]
  ): Promise<Price[]> {
    await this.productValidator.productSavePricesPayloadValidate(data)

    const product = await this.productRepository.findOneByPrimaryColumn(
      productId
    )

    await this.clearPrices(storeId, product, data)

    const prices: Price[] = await this.createPrices(product, storeId, data)

    await Promise.all(prices.map(price => this.priceRepository.save(price)))

    return prices
  }

  private async clearPrices(
    storeId: string,
    product: Product,
    data: ProductSavePriceDto[]
  ) {
    const variationSkusSent =
      data.length === 1 && !data[0].sku
        ? product.getVariationSkus()
        : data.map(priceDto => priceDto.sku)

    const variationSkus = product
      .getVariationSkus()
      .filter(sku => !variationSkusSent.includes(sku))

    if (!variationSkus.length) {
      return
    }

    await this.priceRepository.delete({
      storeId,
      variation: { sku: In(variationSkus) }
    })
  }

  private async createPrices(
    product: Product,
    storeId: string,
    data: ProductSavePriceDto[]
  ) {
    const invalidDataException = new InvalidDataException('Invalid data.')

    const promises = []

    if (data.length === 1 && !data[0].sku) {
      const priceDto = data[0]
      product.getVariations().forEach(variation => {
        promises.push(
          this.createPrice(
            variation,
            storeId,
            priceDto.list,
            priceDto.sale,
            invalidDataException
          )
        )
      })

      return await Promise.all(promises)
    }

    data.forEach((priceDto, index) => {
      const variation = product.getVariationBySku(priceDto.sku)

      if (!variation) {
        invalidDataException.addReason({
          id: `${index}.sku.${priceDto.sku}.notFound`,
          message: `Field ${index}.sku.${priceDto.sku} not found.`
        })
        return
      }

      promises.push(
        this.createPrice(
          variation,
          storeId,
          priceDto.list,
          priceDto.sale,
          invalidDataException
        )
      )
    })

    if (!!invalidDataException.getReasons().length) {
      throw invalidDataException
    }

    return await Promise.all(promises)
  }

  private async createPrice(
    variation: Variation,
    storeId: string,
    list: number,
    sale: number,
    invalidDataException: InvalidDataException
  ): Promise<Price> {
    try {
      const price = await this.priceRepository.findBySkuAndCampaignId(
        variation.getSku(),
        null
      )

      price.setList(list).setSale(sale)

      return price
    } catch (e) {
      if (!(e instanceof DataNotFoundException)) throw e

      return new Price(storeId, list, sale, null, variation)
    }
  }
}
