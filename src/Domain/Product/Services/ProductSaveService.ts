import { BrandRepository } from '../../Brand/Repositories/BrandRepository'
import { CategoryRepository } from '../../Category/Repositories/CategoryRepository'
import { DataNotFoundException } from '../../../Core/Models/Exceptions/DataNotFoundException'
import { InvalidDataException } from '../../../Core/Models/Exceptions/InvalidDataException'
import { ProductCreateDto } from '../Dto/ProductCreateDto'
import { Product } from '../Models/Product'
import { ProductRepository } from '../Repositories/ProductRepository'
import { ProductDeleteVariationService } from './ProductDeleteVariationService'
import { ProductSaveVariationService } from './ProductSaveVariationService'

export class ProductSaveService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly brandRepository: BrandRepository,
    private readonly productRepository: ProductRepository,
    private readonly productSaveVariationService: ProductSaveVariationService,
    private readonly productDeleteVariationService: ProductDeleteVariationService
  ) {}

  public async execute(
    storeId: string,
    data: ProductCreateDto,
    isUpdate: boolean = true
  ): Promise<Product> {
    const product = new Product(
      storeId,
      data.title,
      data.description,
      true,
      data.id
    )
      .setCategory(await this.getCategory(data.category.id))
      .setBrand(await this.getBrand(data.brand.id))

    const productSaved = isUpdate
      ? await this.productRepository.save(product)
      : await this.productRepository.create(product)

    if (!!data.variations) {
      const skusToRemove = product
        .getVariationSkus()
        .filter(sku => !data.variations.map(v => v.sku).includes(sku))

      await Promise.all(
        data.variations.map(async variation =>
          this.productSaveVariationService.execute(
            productSaved,
            variation.sku,
            variation,
            isUpdate
          )
        )
      )

      await this.productDeleteVariationService.execute(
        product.getId(),
        product.getStoreId(),
        skusToRemove
      )
    }

    return productSaved
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
