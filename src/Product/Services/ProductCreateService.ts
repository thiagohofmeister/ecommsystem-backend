import { ProductCreateDto } from '../Dto/ProductCreateDto'
import { Product } from '../Models/Product'

export class ProductCreateService {
  constructor() {}

  public async execute(data: ProductCreateDto): Promise<Product> {
    console.log('Cria produto', data)

    const product = new Product(
      data.title,
      '',
      1,
      0,
      0,
      0,
      null,
      data.price.list,
      data.price.sale
    )

    return product
  }
}
