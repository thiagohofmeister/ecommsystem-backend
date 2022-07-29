import { DataNotFoundException } from '../../../Core/Models/Exceptions/DataNotFoundException'
import { InvalidDataException } from '../../../Core/Models/Exceptions/InvalidDataException'
import { AttributeRepository } from '../../Attribute/Repositories/AttributeRepository'
import { BrandRepository } from '../../Brand/Repositories/BrandRepository'
import { CategoryRepository } from '../../Category/Repositories/CategoryRepository'
import { ProductCreateDto } from '../Dto/ProductCreateDto'
import { ProductSaveDto } from '../Dto/ProductSaveDto'
import { ProductVariationTemplate } from '../Interfaces/ProductVariationTemplate'
import { Image } from '../Models/Image'
import { Product } from '../Models/Product'
import { ProductRepository } from '../Repositories/ProductRepository'
import { ProductDeleteUnusedImagesService } from './ProductDeleteUnusedImagesService'
import { VariationDeleteService } from '../../Variation/Services/VariationDeleteService'
import { VariationSaveService } from '../../Variation/Services/VariationSaveService'

export class ProductSaveService {
  constructor(
    private readonly attributeRepository: AttributeRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly brandRepository: BrandRepository,
    private readonly productRepository: ProductRepository,
    private readonly variationSaveService: VariationSaveService,
    private readonly variationDeleteService: VariationDeleteService,
    private readonly productDeleteUnUsedImagesService: ProductDeleteUnusedImagesService
  ) {}

  public async execute(
    storeId: string,
    data: ProductSaveDto,
    product?: Product
  ): Promise<Product> {
    const productToSave = await this.getProductToSaved(product, storeId, data)

    await this.validateVariationTemplate(productToSave.getVariationTemplate())

    const combinations = await this.getVariationCombinations(
      productToSave.getVariationTemplate(),
      data.variations
    )

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
      return []
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
            const attribute = varDto.attributes.find(
              varAttr => varAttr.attribute.id === combinationId
            )

            return attribute.value
          })
          .join('+')

        combinations[key].push(combination)
      })
    })

    return combinations
  }

  private async validateVariationTemplate(
    variationTemplate: ProductVariationTemplate
  ) {
    if (!variationTemplate) {
      return
    }

    const attributes = await this.attributeRepository.findAllByIds(
      variationTemplate.attributes.map(attr => attr.id)
    )

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
        if (
          !!variationTemplate.attributes.find(
            attr => attr.id === variationTemplate[key]
          )
        ) {
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

  private async getProductToSaved(
    product: Product,
    storeId: string,
    data: ProductSaveDto
  ) {
    if (!product) {
      return new Product(
        storeId,
        data.title,
        data.description,
        data.variationTemplate,
        true,
        data.id
      )
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

  private async fillImages(
    product: Product,
    images: ProductCreateDto['images'],
    combinations: string[]
  ) {
    if (!images) {
      return
    }

    product.removeImages(images.filter(i => !!i.id).map(i => i.id))

    await this.productDeleteUnUsedImagesService.execute(
      product.getId(),
      product.getStoreId(),
      product.getImagesIds()
    )

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

      const image = new Image(
        imageDto.url,
        position,
        imageDto.value,
        product.getStoreId()
      )

      product.addImage(image)
    })

    if (!!invalidDataException.getReasons().length) {
      throw invalidDataException
    }
  }

  private async saveVariations(
    product: Product,
    variations: ProductCreateDto['variations'],
    isUpdate: boolean
  ) {
    if (!!variations) {
      const skusToRemove = product
        .getVariationSkus()
        .filter(sku => !variations.map(v => v.sku).includes(sku))

      await Promise.all(
        variations.map(async (variation, index) =>
          this.variationSaveService.execute(
            product,
            variation.sku,
            variation,
            isUpdate
              ? product.getVariations()?.find(v => v.getSku() === variation.sku)
              : null,
            index
          )
        )
      )

      await this.variationDeleteService.execute(
        product.getId(),
        product.getStoreId(),
        skusToRemove
      )
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
}
