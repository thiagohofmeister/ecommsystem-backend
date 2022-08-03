import { Stock } from '../../Domain/Variation/Models/Stock'
import { StockRepository } from '../../Domain/Variation/Repositories/StockRepository'
import { TypeOrmMysqlRepositoryContract } from '../../Core/Repositories/Contracts/TypeOrmMysqlRepositoryContract'
import { StockDao } from '../Models/StockDao'

export class StockRepositoryImpl
  extends TypeOrmMysqlRepositoryContract<Stock, StockDao>
  implements StockRepository {}
