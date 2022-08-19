import { IItemListModel } from 'ecommsystem-core'

import { AttributeValidator } from './AttributeValidator'
import { AttributeCreateDto } from './Dto/AttributeCreateDto'
import { AttributeGetListFilterDto } from './Dto/AttributeGetListFilterDto'
import { AttributeSaveDto } from './Dto/AttributeSaveDto'
import { AttributeUpdateDto } from './Dto/AttributeUpdateDto'
import { Attribute } from './Models/Attribute'
import { AttributeRepository } from './Repositories/AttributeRepository'

export class AttributeService {
  constructor(
    private readonly attributeRepository: AttributeRepository,
    private readonly attributeValidator: AttributeValidator
  ) {}

  public async create(
    storeId: string,
    data: AttributeCreateDto
  ): Promise<Attribute> {
    await this.attributeValidator.attributeCreatePayloadValidate(data)

    return this.save(storeId, data)
  }

  public async update(
    id: string,
    storeId: string,
    data: AttributeUpdateDto
  ): Promise<Attribute> {
    await this.attributeValidator.attributeUpdatePayloadValidate(data)

    return this.save(storeId, data, await this.getOneById(id))
  }

  public async getOneById(id: string): Promise<Attribute> {
    return this.attributeRepository.findOneByPrimaryColumn(id)
  }

  public async list(
    filter: AttributeGetListFilterDto
  ): Promise<IItemListModel<Attribute>> {
    return this.attributeRepository.findAll(filter)
  }

  private async save(
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
