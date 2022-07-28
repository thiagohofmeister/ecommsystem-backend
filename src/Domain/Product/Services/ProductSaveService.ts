import { DataNotFoundException } from '../../../Core/Models/Exceptions/DataNotFoundException'
import { InvalidDataException } from '../../../Core/Models/Exceptions/InvalidDataException'
import { BrandRepository } from '../../Brand/Repositories/BrandRepository'
import { CategoryRepository } from '../../Category/Repositories/CategoryRepository'
import { ProductCreateDto } from '../Dto/ProductCreateDto'
import { Image } from '../Models/Image'
import { Product } from '../Models/Product'
import { ProductRepository } from '../Repositories/ProductRepository'
import { ProductDeleteUnusedImagesService } from './ProductDeleteUnUsedImagesService'
import { ProductDeleteVariationService } from './ProductDeleteVariationService'
import { ProductSaveImageService } from './ProductSaveImageService'
import { ProductSaveVariationService } from './ProductSaveVariationService'

export class ProductSaveService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly brandRepository: BrandRepository,
    private readonly productRepository: ProductRepository,
    private readonly productSaveVariationService: ProductSaveVariationService,
    private readonly productDeleteVariationService: ProductDeleteVariationService,
    private readonly productSaveImageService: ProductSaveImageService,
    private readonly productDeleteUnUsedImagesService: ProductDeleteUnusedImagesService
  ) {}

  public async execute(
    storeId: string,
    data: ProductCreateDto,
    product?: Product
  ): Promise<Product> {
    const productToSave = await this.getProductToSaved(product, storeId, data)

    await this.fillImages(productToSave, data.images)

    const productSaved = !!product
      ? await this.productRepository.save(productToSave)
      : await this.productRepository.create(productToSave)

    await this.saveVariations(productSaved, data.variations, !!product)

    return this.productRepository.findOneByPrimaryColumn(productSaved.getId())
  }

  private async getProductToSaved(
    product: Product,
    storeId: string,
    data: ProductCreateDto
  ) {
    if (!product) {
      return new Product(storeId, data.title, data.description, true, data.id)
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
    images: ProductCreateDto['images']
  ) {
    if (!!images) {
      console.log(images.filter(i => !!i.id).map(i => i.id))
      product.removeImages(images.filter(i => !!i.id).map(i => i.id))

      images.forEach((imageDto, position) => {
        if (!!imageDto.id) {
          const image = product.getImageById(imageDto.id).setPosition(position)

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

      await this.productDeleteUnUsedImagesService.execute(
        product.getId(),
        product.getStoreId(),
        product.getImagesIds()
      )
    }
  }

  private async saveImages(
    product: Product,
    images: ProductCreateDto['images'],
    isUpdate: boolean
  ) {
    if (!!images) {
      const idsToRemove = product.getImagesIds().filter(
        id =>
          !images
            .filter(i => !!i.id)
            .map(i => i.id)
            .includes(id)
      )

      await Promise.all(
        images.map(async (image, position) =>
          this.productSaveImageService.execute(
            product,
            position,
            image,
            isUpdate && !!image.id
              ? product.getImages()?.find(v => v.getId() === image.id)
              : null
          )
        )
      )

      await this.productDeleteUnUsedImagesService.execute(
        product.getId(),
        product.getStoreId(),
        idsToRemove
      )
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
        variations.map(async variation =>
          this.productSaveVariationService.execute(
            product,
            variation.sku,
            variation,
            isUpdate
              ? product.getVariations()?.find(v => v.getSku() === variation.sku)
              : null
          )
        )
      )

      await this.productDeleteVariationService.execute(
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
