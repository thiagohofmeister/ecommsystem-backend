import { ProductGetListFilterDto } from '../Dto/ProductGetListFilterDto'
import { ProductRepository } from '../Repositories/ProductRepository'

export class ProductGetListService {
  constructor(private readonly productRepository: ProductRepository) {}

  public async execute(filter: ProductGetListFilterDto) {
    return this.productRepository.findAll(filter)
  }
}
