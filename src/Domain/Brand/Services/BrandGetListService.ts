import { IItemListModel } from '../../../Core/Models/Interfaces/IItemListModel'
import { BrandGetListFilterDto } from '../Dto/BrandGetListFilterDto'
import { Brand } from '../Models/Brand'
import { BrandRepository } from '../Repositories/BrandRepository'

export class BrandGetListService {
  constructor(private readonly brandRepository: BrandRepository) {}

  public async execute(
    filter: BrandGetListFilterDto
  ): Promise<IItemListModel<Brand>> {
    return this.brandRepository.findAll(filter)
  }
}
