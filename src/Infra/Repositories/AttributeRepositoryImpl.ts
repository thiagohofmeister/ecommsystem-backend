import { Attribute } from '../../Domain/Attribute/Models/Attribute'
import { AttributeRepository } from '../../Domain/Attribute/Repositories/AttributeRepository'
import { TypeOrmMysqlRepositoryContract } from '../../Core/Repositories/Contracts/TypeOrmMysqlRepositoryContract'
import { AttributeDao } from '../Models/AttributeDao'

export class AttributeRepositoryImpl
  extends TypeOrmMysqlRepositoryContract<Attribute, AttributeDao>
  implements AttributeRepository {}
