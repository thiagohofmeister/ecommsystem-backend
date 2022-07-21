import { CategoryRepository } from '../Repositories/CategoryRepository'
import { DataNotFoundException } from '../../Core/Models/Exceptions/DataNotFoundException'
import { InvalidDataException } from '../../Core/Models/Exceptions/InvalidDataException'
import { CategoryValidator } from '../Validators/CategoryValidator'
import { CategoryCreateDto } from '../Dto/CategoryCreateDto'
import { Category } from '../Models/Category'
import { kebabCase } from 'lodash'
import { CategoryQueue } from '../../Infra/Queues/CategoryQueue'

export class CategoryCreateService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly categoryValidator: CategoryValidator,
    private readonly categoryQueue: CategoryQueue
  ) {}

  public async execute(
    storeId: string,
    data: CategoryCreateDto
  ): Promise<Category> {
    await this.categoryValidator.categoryCreatePayloadValidate(data)

    let parent = null
    if (data.parent?.id) {
      parent = await this.getCategory(data.parent.id)
    }

    const category = new Category(
      storeId,
      data.label,
      await this.generateUrn(data.urn || data.label),
      data.description,
      parent
    )

    await this.categoryRepository.save(category)

    await this.categoryQueue.sendMessage('categoryCreated', {
      categoryId: category.getId()
    })

    return category
  }

  private async generateUrn(str: string, count: number = 0) {
    const slug = `${kebabCase(str)}${count ? `-${count}` : ''}`

    try {
      await this.categoryRepository.findOneByUrn(slug)
      return this.generateUrn(str, ++count)
    } catch (e) {
      if (!(e instanceof DataNotFoundException)) throw e
    }

    return slug
  }

  private async getCategory(id) {
    try {
      return await this.categoryRepository.findOneById(id)
    } catch (err) {
      if (!(err instanceof DataNotFoundException)) throw err

      throw new InvalidDataException('Invalid data.', [
        {
          id: `parent.id.${id}.notFound`,
          message: `Field parent.id.${id} not found.`
        }
      ])
    }
  }
}
