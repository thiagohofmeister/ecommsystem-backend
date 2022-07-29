import { VariationAttribute } from '../../Domain/Product/Models/VariationAttribute'
import { VariationAttributeRepository } from '../../Domain/Product/Repositories/VariationAttributeRepository'
import { TypeOrmMysqlRepositoryContract } from '../../Core/Repositories/Contracts/TypeOrmMysqlRepositoryContract'
import { VariationAttributeDao } from '../Models/VariationAttributeDao'

export class VariationAttributeRepositoryImpl
  extends TypeOrmMysqlRepositoryContract<
    VariationAttribute,
    VariationAttributeDao
  >
  implements VariationAttributeRepository {}
