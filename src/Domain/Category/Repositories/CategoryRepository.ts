import { IRepository } from 'ecommsystem-core'

import { Category } from '../Models/Category'

export interface CategoryRepository extends IRepository<Category> {
  findOneByUrn(urn: string): Promise<Category>
  findAllByParentId(parentId: string): Promise<Category[]>
}
