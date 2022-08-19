import { TypeOrmMysqlRepositoryContract } from 'ecommsystem-core'

import { Variation } from '../../Domain/Variation/Models/Variation'
import { VariationRepository } from '../../Domain/Variation/Repositories/VariationRepository'
import { VariationDao } from '../Models/VariationDao'

export class VariationRepositoryImpl
  extends TypeOrmMysqlRepositoryContract<Variation, VariationDao>
  implements VariationRepository {}
