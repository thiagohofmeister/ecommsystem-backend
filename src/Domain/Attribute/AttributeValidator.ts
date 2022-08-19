import { JoiSchemaValidatorContract } from 'ecommsystem-core'
import { Schema } from 'joi'
import * as Joi from 'joi'

import { AttributeCreateDto } from './Dto/AttributeCreateDto'
import { AttributeUpdateDto } from './Dto/AttributeUpdateDto'

export class AttributeValidator extends JoiSchemaValidatorContract {
  private attributeCreateSchema: Schema
  private attributeUpdateSchema: Schema

  constructor() {
    super()

    this.attributeCreateSchema = Joi.object({
      label: Joi.string().required(),
      values: Joi.array().items(Joi.string().required())
    })

    this.attributeUpdateSchema = Joi.object({
      label: Joi.string().optional(),
      values: Joi.array().items(Joi.string().required())
    })
  }

  public async attributeCreatePayloadValidate(payload: AttributeCreateDto) {
    return this.validateBySchema<AttributeCreateDto>(
      payload,
      this.attributeCreateSchema
    )
  }

  public async attributeUpdatePayloadValidate(payload: AttributeUpdateDto) {
    return this.validateBySchema<AttributeUpdateDto>(
      payload,
      this.attributeUpdateSchema
    )
  }
}
