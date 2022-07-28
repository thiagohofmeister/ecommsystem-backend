import { ProductRepository } from '../Repositories/ProductRepository'

export class ProductGetOneByIdService {
  constructor(private readonly productRepository: ProductRepository) {}

  public async execute(id: string) {
    return this.productRepository.findOneByPrimaryColumn(id)
  }
}
