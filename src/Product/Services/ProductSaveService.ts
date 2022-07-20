import { CategoryRepository } from '../../Category/Repositories/CategoryRepository'
import { DataNotFoundException } from '../../Core/Models/Exceptions/DataNotFoundException'
import { InvalidDataException } from '../../Core/Models/Exceptions/InvalidDataException'
import { ProductCreateDto } from '../Dto/ProductCreateDto'
import { Product } from '../Models/Product'
import { ProductRepository } from '../Repositories/ProductRepository'

export class ProductSaveService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly productRepository: ProductRepository
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

    return this.productRepository.save(product)
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
