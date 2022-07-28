import { IItemListModel } from '../../../Core/Models/Interfaces/IItemListModel'
import { AttributeGetListFilterDto } from '../Dto/AttributeGetListFilterDto'
import { Attribute } from '../Models/Attribute'
import { AttributeRepository } from '../Repositories/AttributeRepository'

export class AttributeGetListService {
  constructor(private readonly attributeRepository: AttributeRepository) {}

  public async execute(
    filter: AttributeGetListFilterDto
  ): Promise<IItemListModel<Attribute>> {
    return this.attributeRepository.findAll(filter)
  }
}
