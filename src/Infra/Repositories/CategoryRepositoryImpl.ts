import { IsNull } from 'typeorm'
import { Category } from '../../Category/Models/Category'
import { CategoryRepository } from '../../Category/Repositories/CategoryRepository'
import { TypeOrmMysqlRepositoryContract } from '../../Core/Repositories/Contracts/TypeOrmMysqlRepositoryContract'
import { CategoryDao } from '../Models/CategoryDao'

export class CategoryRepositoryImpl
  extends TypeOrmMysqlRepositoryContract<Category, CategoryDao>
  implements CategoryRepository
{
  async findAllByParentId(parentId: string): Promise<Category[]> {
    const categories = await this.repository
      .createQueryBuilder()
      .where({ parent: { id: parentId || IsNull() } })
      .getMany()

    return this.dataMapper.toDomainMany(categories)
  }

  async findOneByUrn(urn: string): Promise<Category> {
    const category = await this.repository.findOne({ where: { urn } })

    if (!category) throw this.dataNotFoundException

    return this.dataMapper.toDomainEntity(category)
  }

  async findOneById(id: string): Promise<Category> {
    const category = await this.repository.findOne({ where: { id } })

    if (!category) throw this.dataNotFoundException

    return this.dataMapper.toDomainEntity(category)
  }
}
