import { DataNotFoundException, InvalidDataException } from 'ecommsystem-core'
import { In, Not } from 'typeorm'

import { AttributeRepository } from '../Attribute/Repositories/AttributeRepository'
import { BrandRepository } from '../Brand/Repositories/BrandRepository'
import { CategoryRepository } from '../Category/Repositories/CategoryRepository'
import { Variation } from '../Variation/Models/Variation'
import { VariationService } from '../Variation/VariationService'
import { ProductCreateDto } from './Dto/ProductCreateDto'
import { ProductGetListFilterDto } from './Dto/ProductGetListFilterDto'
import { ProductSaveDto } from './Dto/ProductSaveDto'
import { ProductSavePriceDto } from './Dto/ProductSavePriceDto'
import { ProductUpdateDto } from './Dto/ProductUpdateDto'
import { ProductConflict } from './Exceptions/ProductConflict'
import { ProductVariationTemplate } from './Interfaces/ProductVariationTemplate'
import { Image } from './Models/Image'
import { Price } from './Models/Price'
import { Product } from './Models/Product'
import { ProductValidator } from './ProductValidator'
import { ImageRepository } from './Repositories/ImageRepository'
import { PriceRepository } from './Repositories/PriceRepository'
import { ProductRepository } from './Repositories/ProductRepository'

export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productValidator: ProductValidator,
    private readonly priceRepository: PriceRepository,
    private readonly imageRepository: ImageRepository,
    private readonly attributeRepository: AttributeRepository,
    private readonly brandRepository: BrandRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly variationService: VariationService
  ) {}

  public async create(storeId: string, data: ProductCreateDto): Promise<Product> {
    await this.validateProductAlreadyExists(data.id)

    await this.productValidator.productCreatePayloadValidate(data)

    return this.save(storeId, data)
  }

  public async update(id: string, data: ProductUpdateDto): Promise<Product> {
    await this.productValidator.productUpdatePayloadValidate(data)

    return this.save(id, data, await this.getOneById(id))
  }

  public async list(filter: ProductGetListFilterDto) {
    return this.productRepository.findAll(filter)
  }

  public async getOneById(id: string) {
    return this.productRepository.findOneByPrimaryColumn(id)
  }

  public async savePrices(productId: string, storeId: string, data: ProductSavePriceDto[]): Promise<Price[]> {
    await this.productValidator.productSavePricesPayloadValidate(data)

    const product = await this.productRepository.findOneByPrimaryColumn(productId)

    await this.clearPrices(storeId, product, data)

    const prices: Price[] = await this.createPrices(product, storeId, data)

    await Promise.all(prices.map(price => this.priceRepository.save(price)))

    return prices
  }

  private async clearPrices(storeId: string, product: Product, data: ProductSavePriceDto[]) {
    const variationSkusSent =
      data.length === 1 && !data[0].sku ? product.getVariationSkus() : data.map(priceDto => priceDto.sku)

    const variationSkus = product.getVariationSkus().filter(sku => !variationSkusSent.includes(sku))

    if (!variationSkus.length) {
      return
    }

    await this.priceRepository.delete({
      storeId,
      variation: { sku: In(variationSkus) }
    })
  }

  private async createPrices(product: Product, storeId: string, data: ProductSavePriceDto[]) {
    const invalidDataException = new InvalidDataException('Invalid data.')

    const promises = []

    if (data.length === 1 && !data[0].sku) {
      const priceDto = data[0]
      product.getVariations().forEach(variation => {
        promises.push(this.createPrice(variation, storeId, priceDto.list, priceDto.sale, invalidDataException))
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

      promises.push(this.createPrice(variation, storeId, priceDto.list, priceDto.sale, invalidDataException))
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
      const price = await this.priceRepository.findBySkuAndCampaignId(variation.getSku(), null)

      price.setList(list).setSale(sale)

      return price
    } catch (e) {
      if (!(e instanceof DataNotFoundException)) throw e

      return new Price(storeId, list, sale, null, variation)
    }
  }

  private async deleteUnusedImages(productId: string, storeId: string, idsToKeep: string | string[]) {
    if (typeof idsToKeep === 'string') {
      idsToKeep = [idsToKeep]
    }

    return this.imageRepository.delete({
      id: Not(In(idsToKeep)),
      product: { id: productId, storeId }
    })
  }

  private async save(storeId: string, data: ProductSaveDto, product?: Product): Promise<Product> {
    const productToSave = await this.getProductToSaved(product, storeId, data)

    await this.validateVariationTemplate(productToSave.getVariationTemplate())

    // TODO: Validate if each attribute exists `data.variations.[].attributes`

    const combinations = await this.getVariationCombinations(productToSave.getVariationTemplate(), data.variations)

    await this.fillImages(productToSave, data.images, combinations['images'])

    const productSaved = await this.productRepository.save(productToSave)

    await this.saveVariations(productSaved, data.variations, !!product)

    return this.productRepository.findOneByPrimaryColumn(productSaved.getId())
  }

  private async getVariationCombinations(
    variationTemplate: ProductVariationTemplate,
    variationsDto: ProductSaveDto['variations']
  ) {
    if (!variationTemplate) {
      return {
        images: []
      }
    }

    const combinationIds = {}

    Object.keys(variationTemplate)
      .filter(k => k !== 'attributes' && !!variationTemplate[k])
      .forEach(k => {
        combinationIds[k] = []

        for (const attr of variationTemplate.attributes) {
          combinationIds[k].push(attr.id)

          if (attr.id === variationTemplate[k]) break
        }
      })

    const combinations = {}

    Object.keys(combinationIds).forEach(key => {
      combinations[key] = []

      variationsDto.forEach(varDto => {
        const combination = combinationIds[key]
          .map(combinationId => {
            const attribute = varDto.attributes.find(varAttr => varAttr.attribute.id === combinationId)

            return attribute.value
          })
          .join('+')

        combinations[key].push(combination)
      })
    })

    return combinations
  }

  private async validateVariationTemplate(variationTemplate: ProductVariationTemplate) {
    if (!variationTemplate) {
      return
    }

    const attributes = await this.attributeRepository.findAllByIds(variationTemplate.attributes.map(attr => attr.id))

    const invalidDataException = new InvalidDataException('Invalid data.')

    variationTemplate.attributes.forEach((attrDto, index) => {
      if (!!attributes.find(attr => attr.getId() === attrDto.id)) {
        return
      }

      invalidDataException.addReason({
        id: `variationTemplate.attributes.${index}.id.${attrDto.id}.notFound`,
        message: `Field variationTemplate.attributes.${index}.id.${attrDto.id} not found.`
      })
    })

    Object.keys(variationTemplate)
      .filter(k => k !== 'attributes')
      .forEach(key => {
        if (!!variationTemplate.attributes.find(attr => attr.id === variationTemplate[key])) {
          return
        }

        invalidDataException.addReason({
          id: `variationTemplate.${key}.${variationTemplate[key]}.notAllowed`,
          message: `Field variationTemplate.${key}.${variationTemplate[key]} not allowed.`
        })
      })

    if (!!invalidDataException.getReasons().length) {
      throw invalidDataException
    }
  }

  private async getProductToSaved(product: Product, storeId: string, data: ProductSaveDto) {
    if (!product) {
      return new Product(storeId, data.title, data.description, data.variationTemplate, true, data.id)
        .setCategory(await this.getCategory(data.category.id))
        .setBrand(await this.getBrand(data.brand.id))
    }

    if (data.hasOwnProperty('title')) {
      product.setTitle(data.title)
    }

    if (data.hasOwnProperty('active')) {
      product.setActive(data.active)
    }

    if (data.hasOwnProperty('brand')) {
      product.setBrand(await this.getBrand(data.brand.id))
    }

    if (data.hasOwnProperty('category')) {
      product.setCategory(await this.getCategory(data.category.id))
    }

    if (data.hasOwnProperty('description')) {
      product.setDescription(data.description)
    }

    return product
  }

  private async fillImages(product: Product, images: ProductCreateDto['images'], combinations: string[]) {
    if (!images) {
      return
    }

    product.removeImages(images.filter(i => !!i.id).map(i => i.id))

    await this.deleteUnusedImages(product.getId(), product.getStoreId(), product.getImagesIds())

    const invalidDataException = new InvalidDataException('Invalid data.')

    images.forEach((imageDto, position) => {
      if (!!imageDto.value && !combinations.includes(imageDto.value)) {
        invalidDataException.addReason({
          id: `images.${position}.value.${imageDto.value}.notAllowed`,
          message: `Field images.${position}.value.${imageDto.value} not allowed.`
        })
        return
      }

      if (!!imageDto.id) {
        const image = product.getImageById(imageDto.id)

        if (!image) {
          invalidDataException.addReason({
            id: `images.${position}.id.${imageDto.id}.notFound`,
            message: `Field images.${position}.id.${imageDto.id} not found.`
          })
          return
        }

        image.setPosition(position)

        if (imageDto.hasOwnProperty('url')) {
          image.setUrl(imageDto.url)
        }

        if (imageDto.hasOwnProperty('value')) {
          image.setValue(imageDto.value)
        }
        return
      }

      const image = new Image(imageDto.url, position, imageDto.value, product.getStoreId())

      product.addImage(image)
    })

    if (!!invalidDataException.getReasons().length) {
      throw invalidDataException
    }
  }

  private async saveVariations(product: Product, variations: ProductCreateDto['variations'], isUpdate: boolean) {
    if (!!variations) {
      const skusToRemove = product.getVariationSkus().filter(sku => !variations.map(v => v.sku).includes(sku))

      await Promise.all(
        variations.map(async (variation, index) => {
          if (isUpdate) {
            return this.variationService.update(
              product,
              variation.sku,
              variation,
              product.getVariations()?.find(v => v.getSku() === variation.sku),
              index
            )
          }

          return this.variationService.create(product, variation.sku, variation, index)
        })
      )

      await this.variationService.delete(product.getId(), product.getStoreId(), skusToRemove)
    }
  }

  private async getCategory(id: string) {
    try {
      return await this.categoryRepository.findOneByPrimaryColumn(id)
    } catch (err) {
      if (!(err instanceof DataNotFoundException)) throw err

      throw new InvalidDataException('Invalid data.', [
        {
          id: `category.id.${id}.notFound`,
          message: `Field category.id.${id} not found.`
        }
      ])
    }
  }

  private async getBrand(id: string) {
    try {
      return await this.brandRepository.findOneByPrimaryColumn(id)
    } catch (err) {
      if (!(err instanceof DataNotFoundException)) throw err

      throw new InvalidDataException('Invalid data.', [
        {
          id: `brand.id.${id}.notFound`,
          message: `Field brand.id.${id} not found.`
        }
      ])
    }
  }

  private async validateProductAlreadyExists(id: string) {
    let exists = false

    try {
      await this.productRepository.findOneByPrimaryColumn(id)
      exists = true
    } catch (e) {
      if (!(e instanceof DataNotFoundException)) throw e
    }

    if (exists) throw new ProductConflict()
  }
}
