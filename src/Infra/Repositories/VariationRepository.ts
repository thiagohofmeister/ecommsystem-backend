import { Variation } from '../../Product/Models/Variation'
import { VariationRepository } from '../../Product/Repositories/VariationRepository'
import { TypeOrmMysqlRepositoryContract } from '../../Core/Repositories/Contracts/TypeOrmMysqlRepositoryContract'
import { VariationDao } from '../Models/VariationDao'

export class VariationRepositoryImpl
  extends TypeOrmMysqlRepositoryContract<Variation, VariationDao>
  implements VariationRepository
{
  async findOneById(id: string): Promise<Variation> {
    throw new Error("The variation doesn't have an id")
  }
}
