import { kebabCase } from 'lodash'

import { DataNotFoundException } from '../../../Core/Models/Exceptions/DataNotFoundException'
import { InvalidDataException } from '../../../Core/Models/Exceptions/InvalidDataException'
import { CategoryQueue } from '../../../Infra/Queues/CategoryQueue'
import { CategorySaveDto } from '../Dto/CategorySaveDto'
import { Category } from '../Models/Category'
import { CategoryRepository } from '../Repositories/CategoryRepository'

export class CategorySaveService {
  private CATEGORY_CREATED_EVENT = 'categoryCreated'
  private CATEGORY_UPDATED_EVENT = 'categoryUpdated'

  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly categoryQueue: CategoryQueue
  ) {}

  public async execute(
    storeId: string,
    data: CategorySaveDto,
    category?: Category
  ): Promise<Category> {
    await this.categoryRepository.save(
      await this.getCategoryToSave(storeId, data, category)
    )

    await this.categoryQueue.sendMessage(
      !!category ? this.CATEGORY_UPDATED_EVENT : this.CATEGORY_CREATED_EVENT,
      {
        categoryId: category.getId(),
        storeId
      }
    )

    return category
  }

  private async getCategoryToSave(
    storeId: string,
    data: CategorySaveDto,
    category?: Category
  ): Promise<Category> {
    if (!category) {
      return new Category(
        storeId,
        data.label,
        await this.generateUrn(data.urn || data.label),
        data.description,
        await this.getParent(data.parent?.id)
      )
    }

    if (data.hasOwnProperty('description')) {
      category.setDescription(data.description)
    }

    if (data.hasOwnProperty('label')) {
      category.setLabel(data.label)
    }

    if (data.hasOwnProperty('parent')) {
      category.setParent(await this.getParent(data.parent.id))
    }

    return category.setUrn(
      await this.generateUrn(
        data.urn || data.label || category.getLabel(),
        category
      )
    )
  }

  private async generateUrn(
    str: string,
    category?: Category,
    count: number = 0
  ) {
    const slug = `${kebabCase(str)}${count ? `-${count}` : ''}`

    try {
      const categoryFound = await this.categoryRepository.findOneByUrn(slug)

      if (categoryFound.getId() === category?.getId()) {
        return slug
      }

      return this.generateUrn(str, category, ++count)
    } catch (e) {
      if (!(e instanceof DataNotFoundException)) throw e
    }

    return slug
  }

  private async getParent(id: string) {
    if (!id) {
      return null
    }

    try {
      return await this.categoryRepository.findOneByPrimaryColumn(id)
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
