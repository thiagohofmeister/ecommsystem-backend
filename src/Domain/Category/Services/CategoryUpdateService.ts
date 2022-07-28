import { CategoryValidator } from '../CategoryValidator'
import { CategoryCreateDto } from '../Dto/CategoryCreateDto'
import { Category } from '../Models/Category'
import { CategoryGetOneByIdService } from './CategoryGetOneByIdService'
import { CategorySaveService } from './CategorySaveService'

export class CategoryUpdateService {
  constructor(
    private readonly categorySaveService: CategorySaveService,
    private readonly categoryGetOneByIdService: CategoryGetOneByIdService,
    private readonly categoryValidator: CategoryValidator
  ) {}

  public async execute(
    id: string,
    storeId: string,
    data: CategoryCreateDto
  ): Promise<Category> {
    await this.categoryValidator.categoryCreatePayloadValidate(data)

    return this.categorySaveService.execute(
      storeId,
      data,
      await this.categoryGetOneByIdService.execute(id)
    )
  }
}
