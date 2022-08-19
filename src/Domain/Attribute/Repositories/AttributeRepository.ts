import { IRepository } from 'ecommsystem-core'

import { Attribute } from '../Models/Attribute'

export interface AttributeRepository extends IRepository<Attribute> {
  findAllByIds(ids: string[]): Promise<Attribute[]>
}
