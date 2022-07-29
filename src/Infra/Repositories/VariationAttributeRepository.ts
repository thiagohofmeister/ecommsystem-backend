import { VariationAttribute } from '../../Domain/Variation/Models/VariationAttribute'
import { VariationAttributeRepository } from '../../Domain/Variation/Repositories/VariationAttributeRepository'
import { TypeOrmMysqlRepositoryContract } from '../../Core/Repositories/Contracts/TypeOrmMysqlRepositoryContract'
import { VariationAttributeDao } from '../Models/VariationAttributeDao'

export class VariationAttributeRepositoryImpl
  extends TypeOrmMysqlRepositoryContract<
    VariationAttribute,
    VariationAttributeDao
  >
  implements VariationAttributeRepository {}
