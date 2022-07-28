import { AttributeSaveDto } from '../Dto/AttributeSaveDto'
import { Attribute } from '../Models/Attribute'
import { AttributeRepository } from '../Repositories/AttributeRepository'

export class AttributeSaveService {
  constructor(private readonly attributeRepository: AttributeRepository) {}

  public async execute(
    storeId: string,
    data: AttributeSaveDto,
    attribute?: Attribute
  ): Promise<Attribute> {
    return this.attributeRepository.save(
      await this.getAttributeToSave(storeId, data, attribute)
    )
  }

  private async getAttributeToSave(
    storeId: string,
    data: AttributeSaveDto,
    attribute?: Attribute
  ): Promise<Attribute> {
    if (!attribute) {
      return new Attribute(storeId, data.label, data.values)
    }

    if (data.hasOwnProperty('label')) {
      attribute.setLabel(data.label)
    }

    // TODO: Validate if any product use some value, then the value must be kept on update
    if (data.hasOwnProperty('values')) {
      attribute.setValues(data.values)
    }

    return attribute
  }
}
