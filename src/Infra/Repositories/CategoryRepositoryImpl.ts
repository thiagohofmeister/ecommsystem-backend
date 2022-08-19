import { TypeOrmMysqlRepositoryContract } from 'ecommsystem-core'
import { IsNull } from 'typeorm'

import { Category } from '../../Domain/Category/Models/Category'
import { CategoryRepository } from '../../Domain/Category/Repositories/CategoryRepository'
import { CategoryDao } from '../Models/CategoryDao'

export class CategoryRepositoryImpl
  extends TypeOrmMysqlRepositoryContract<Category, CategoryDao>
  implements CategoryRepository
{
  async findAllByParentId(parentId: string): Promise<Category[]> {
    const categories = await this.repository
      .createQueryBuilder()
      .where({ storeId: this.storeId, parent: { id: parentId || IsNull() } })
      .getMany()

    return this.dataMapper.toDomainEntityMany(categories)
  }

  async findOneByUrn(urn: string): Promise<Category> {
    const category = await this.repository.findOne({
      where: { storeId: this.storeId, urn }
    })

    if (!category) throw this.dataNotFoundException

    return this.dataMapper.toDomainEntity(category)
  }
}
