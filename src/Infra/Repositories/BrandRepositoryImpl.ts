import { Brand } from '../../Domain/Brand/Models/Brand'
import { BrandRepository } from '../../Domain/Brand/Repositories/BrandRepository'
import { TypeOrmMysqlRepositoryContract } from '../../Core/Repositories/Contracts/TypeOrmMysqlRepositoryContract'
import { BrandDao } from '../Models/BrandDao'

export class BrandRepositoryImpl
  extends TypeOrmMysqlRepositoryContract<Brand, BrandDao>
  implements BrandRepository
{
  async findOneByUrn(urn: string): Promise<Brand> {
    const category = await this.repository.findOne({ where: { urn } })

    if (!category) throw this.dataNotFoundException

    return this.dataMapper.toDomainEntity(category)
  }
}
