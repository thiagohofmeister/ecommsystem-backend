import { TypeOrmMysqlRepositoryContract } from 'ecommsystem-core'

import { VariationAttribute } from '../../Domain/Variation/Models/VariationAttribute'
import { VariationAttributeRepository } from '../../Domain/Variation/Repositories/VariationAttributeRepository'
import { VariationAttributeDao } from '../Models/VariationAttributeDao'

export class VariationAttributeRepositoryImpl
  extends TypeOrmMysqlRepositoryContract<
    VariationAttribute,
    VariationAttributeDao
  >
  implements VariationAttributeRepository {}
