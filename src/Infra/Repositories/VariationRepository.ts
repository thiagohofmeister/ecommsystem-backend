import { Variation } from '../../Domain/Product/Models/Variation'
import { VariationRepository } from '../../Domain/Product/Repositories/VariationRepository'
import { TypeOrmMysqlRepositoryContract } from '../../Core/Repositories/Contracts/TypeOrmMysqlRepositoryContract'
import { VariationDao } from '../Models/VariationDao'

export class VariationRepositoryImpl
  extends TypeOrmMysqlRepositoryContract<Variation, VariationDao>
  implements VariationRepository {}
