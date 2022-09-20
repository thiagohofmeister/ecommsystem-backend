import { TypeOrmMysqlRepositoryContract } from 'ecommsystem-core'

import { Store } from '../../Domain/Store/Models/Store'
import { StoreRepository } from '../../Domain/Store/Repositories/StoreRepository'
import { StoreDao } from '../Models/StoreDao'

export class StoreRepositoryImpl
  extends TypeOrmMysqlRepositoryContract<Store, StoreDao>
  implements StoreRepository
{
  async findOneByDocumentNumber(documentNumber: string): Promise<Store> {
    const store = await this.repository.findOne({ where: { documentNumber } })

    if (!store) {
      throw this.dataNotFoundException
    }

    return this.dataMapper.toDomainEntity(store)
  }
}
