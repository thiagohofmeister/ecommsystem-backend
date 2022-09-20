import { IRepository } from 'ecommsystem-core'

import { Store } from '../Models/Store'

export interface StoreRepository extends IRepository<Store> {
  findOneByDocumentNumber(documentNumber: string): Promise<Store>
}
