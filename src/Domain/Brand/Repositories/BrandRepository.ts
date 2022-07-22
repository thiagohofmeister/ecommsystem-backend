import { IRepository } from '../../../Core/Models/Interfaces/IRepository'
import { Brand } from '../Models/Brand'

export interface BrandRepository extends IRepository<Brand> {
  findOneByUrn(urn: string): Promise<Brand>
}
