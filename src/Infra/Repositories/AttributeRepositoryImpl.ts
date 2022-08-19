import { TypeOrmMysqlRepositoryContract } from 'ecommsystem-core'

import { Attribute } from '../../Domain/Attribute/Models/Attribute'
import { AttributeRepository } from '../../Domain/Attribute/Repositories/AttributeRepository'
import { AttributeDao } from '../Models/AttributeDao'

export class AttributeRepositoryImpl
  extends TypeOrmMysqlRepositoryContract<Attribute, AttributeDao>
  implements AttributeRepository
{
  async findAllByIds(ids: string[]): Promise<Attribute[]> {
    const attributes = await this.repository
      .createQueryBuilder()
      .where({ storeId: this.storeId })
      .where('id IN (:ids)', { ids })
      .getMany()

    return this.dataMapper.toDomainEntityMany(attributes)
  }
}
