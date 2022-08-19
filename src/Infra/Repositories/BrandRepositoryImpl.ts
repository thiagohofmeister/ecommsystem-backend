import { TypeOrmMysqlRepositoryContract } from 'ecommsystem-core'

import { Brand } from '../../Domain/Brand/Models/Brand'
import { BrandRepository } from '../../Domain/Brand/Repositories/BrandRepository'
import { BrandDao } from '../Models/BrandDao'

export class BrandRepositoryImpl
  extends TypeOrmMysqlRepositoryContract<Brand, BrandDao>
  implements BrandRepository
{
  async findOneByUrn(urn: string): Promise<Brand> {
    const category = await this.repository.findOne({
      where: { urn, storeId: this.storeId }
    })

    if (!category) throw this.dataNotFoundException

    return this.dataMapper.toDomainEntity(category)
  }
}
