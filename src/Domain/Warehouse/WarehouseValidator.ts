import { JoiSchemaValidatorContract } from 'ecommsystem-core'
import { Schema } from 'joi'
import * as Joi from 'joi'

import { WarehouseCreateDto } from './Dto/WarehouseCreateDto'
import { WarehouseSavePriorityDto } from './Dto/WarehouseSavePriorityDto'
import { WarehouseUpdateDto } from './Dto/WarehouseUpdateDto'

export class WarehouseValidator extends JoiSchemaValidatorContract {
  private warehouseCreateSchema: Schema
  private warehouseUpdateSchema: Schema
  private warehouseSavePrioritySchema: Schema

  constructor() {
    super()

    this.warehouseSavePrioritySchema = Joi.array().items(
      Joi.object({
        id: Joi.string().required()
      })
    )

    this.warehouseCreateSchema = Joi.object({
      name: Joi.string().required(),
      address: Joi.object({
        zipCode: Joi.string().required(),
        state: Joi.string().required(),
        city: Joi.string().required(),
        district: Joi.string().required(),
        street: Joi.string().required(),
        number: Joi.string().required(),
        complement: Joi.string().allow('', null)
      }).required()
    })

    this.warehouseUpdateSchema = Joi.object({
      name: Joi.string(),
      address: Joi.object({
        zipCode: Joi.string(),
        state: Joi.string(),
        city: Joi.string(),
        district: Joi.string(),
        street: Joi.string(),
        number: Joi.string(),
        complement: Joi.string().allow('', null)
      }).optional()
    })
  }

  public async warehouseCreatePayloadValidate(payload: WarehouseCreateDto) {
    return this.validateBySchema<WarehouseCreateDto>(
      payload,
      this.warehouseCreateSchema
    )
  }

  public async warehouseUpdatePayloadValidate(payload: WarehouseUpdateDto) {
    return this.validateBySchema<WarehouseUpdateDto>(
      payload,
      this.warehouseUpdateSchema
    )
  }

  public async warehouseSavePriorityPayloadValidate(
    payload: WarehouseSavePriorityDto[]
  ) {
    return this.validateBySchema<WarehouseSavePriorityDto[]>(
      payload,
      this.warehouseSavePrioritySchema
    )
  }
}
