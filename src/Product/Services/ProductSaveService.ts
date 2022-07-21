import { CategoryRepository } from '../../Category/Repositories/CategoryRepository'
import { DataNotFoundException } from '../../Core/Models/Exceptions/DataNotFoundException'
import { InvalidDataException } from '../../Core/Models/Exceptions/InvalidDataException'
import { ProductCreateDto } from '../Dto/ProductCreateDto'
import { Product } from '../Models/Product'
import { ProductRepository } from '../Repositories/ProductRepository'
import { ProductSaveVariationService } from './ProductSaveVariationService'

export class ProductSaveService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly productRepository: ProductRepository,
    private readonly productSaveVariationService: ProductSaveVariationService
  ) {}

  public async execute(
    storeId: string,
    data: ProductCreateDto
  ): Promise<Product> {
    const product = new Product(
      storeId,
      data.title,
      data.description,
      true,
      data.id
    ).setCategory(await this.getCategory(data.category.id))

    const productSaved = await this.productRepository.save(product)

    if (!!data.variations?.length) {
      await Promise.all(
        data.variations.map(async variation =>
          this.productSaveVariationService.execute(
            productSaved,
            variation.sku,
            variation
          )
        )
      )
    }

    return productSaved
  }

  private async getCategory(id) {
    try {
      return await this.categoryRepository.findOneById(id)
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
}
