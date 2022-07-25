import { DataNotFoundException } from '../../../Core/Models/Exceptions/DataNotFoundException'
import { ProductCreateDto } from '../Dto/ProductCreateDto'
import { ProductConflict } from '../Exceptions/ProductConflict'
import { Product } from '../Models/Product'
import { ProductRepository } from '../Repositories/ProductRepository'
import { ProductValidator } from '../ProductValidator'
import { ProductSaveService } from './ProductSaveService'

export class ProductCreateService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productValidator: ProductValidator,
    private readonly productSaveService: ProductSaveService
  ) {}

  public async execute(
    storeId: string,
    data: ProductCreateDto
  ): Promise<Product> {
    await this.validateProductAlreadyExists(data.id)

    await this.productValidator.productCreatePayloadValidate(data)

    return this.productSaveService.execute(storeId, data, false)
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
