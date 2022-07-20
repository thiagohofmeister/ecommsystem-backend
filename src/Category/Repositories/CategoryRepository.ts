import { IRepository } from '../../Core/Models/Interfaces/IRepository'
import { Category } from '../Models/Category'

export interface CategoryRepository extends IRepository<Category> {
  findOneByUrn(urn: string): Promise<Category>
}
