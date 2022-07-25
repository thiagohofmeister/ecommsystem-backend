import { Brand } from '../Models/Brand'
import { BrandRepository } from '../Repositories/BrandRepository'

export class BrandGetOneByIdService {
  constructor(private readonly brandRepository: BrandRepository) {}

  public async execute(id: string): Promise<Brand> {
    return this.brandRepository.findOneByPrimaryColumn(id)
  }
}
