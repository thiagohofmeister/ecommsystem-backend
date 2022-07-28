import { Category } from '../Models/Category'
import { CategoryRepository } from '../Repositories/CategoryRepository'

export class CategoryGetOneByIdService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  public async execute(id: string): Promise<Category> {
    return this.categoryRepository.findOneByPrimaryColumn(id)
  }
}
