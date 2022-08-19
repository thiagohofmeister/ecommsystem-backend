import { JoiSchemaValidatorContract } from 'ecommsystem-core'
import { Schema } from 'joi'
import * as Joi from 'joi'

import { CategoryCreateDto } from './Dto/CategoryCreateDto'
import { CategoryUpdateDto } from './Dto/CategoryUpdateDto'

export class CategoryValidator extends JoiSchemaValidatorContract {
  private categoryCreateSchema: Schema
  private categoryUpdateSchema: Schema

  constructor() {
    super()

    this.categoryCreateSchema = Joi.object({
      label: Joi.string().required(),
      urn: Joi.string().optional(),
      description: Joi.string().required(),
      parent: Joi.object({
        id: Joi.string().required()
      }).optional()
    })

    this.categoryUpdateSchema = Joi.object({
      label: Joi.string().optional(),
      urn: Joi.string().optional(),
      description: Joi.string().optional(),
      parent: Joi.object({
        id: Joi.string().required()
      }).optional()
    })
  }

  public async categoryCreatePayloadValidate(payload: CategoryCreateDto) {
    return this.validateBySchema<CategoryCreateDto>(
      payload,
      this.categoryCreateSchema
    )
  }

  public async categoryUpdatePayloadValidate(payload: CategoryUpdateDto) {
    return this.validateBySchema<CategoryUpdateDto>(
      payload,
      this.categoryUpdateSchema
    )
  }
}
