import { ProductCreateDto } from '../Dto/ProductCreateDto'
import { ProductUpdateDto } from '../Dto/ProductUpdateDto'
import { Product } from '../Models/Product'
import { ProductValidator } from '../ProductValidator'
import { ProductGetOneByIdService } from './ProductGetOneByIdService'
import { ProductSaveService } from './ProductSaveService'

export class ProductUpdateService {
  constructor(
    private readonly productGetOneByIdService: ProductGetOneByIdService,
    private readonly productValidator: ProductValidator,
    private readonly productSaveService: ProductSaveService
  ) {}

  public async execute(id: string, data: ProductUpdateDto): Promise<Product> {
    await this.productValidator.productUpdatePayloadValidate(data)

    return this.productSaveService.execute(
      id,
      data,
      await this.productGetOneByIdService.execute(id)
    )
  }
}
