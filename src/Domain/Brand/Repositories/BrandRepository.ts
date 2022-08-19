import { IRepository } from 'ecommsystem-core'

import { Brand } from '../Models/Brand'

export interface BrandRepository extends IRepository<Brand> {
  findOneByUrn(urn: string): Promise<Brand>
}
