import { JoiSchemaValidatorContract } from 'ecommsystem-core'
import { Schema } from 'joi'
import * as Joi from 'joi'

import { BrandCreateDto } from './Dto/BrandCreateDto'
import { BrandUpdateDto } from './Dto/BrandUpdateDto'

export class BrandValidator extends JoiSchemaValidatorContract {
  private brandCreateSchema: Schema
  private brandUpdateSchema: Schema

  constructor() {
    super()

    this.brandCreateSchema = Joi.object({
      label: Joi.string().required(),
      urn: Joi.string().allow('', null).optional(),
      description: Joi.string().allow('', null).required()
    })

    this.brandUpdateSchema = Joi.object({
      label: Joi.string().optional(),
      urn: Joi.string().allow('', null).optional(),
      description: Joi.string().allow('', null).optional()
    })
  }

  public async brandCreatePayloadValidate(payload: BrandCreateDto) {
    return this.validateBySchema<BrandCreateDto>(payload, this.brandCreateSchema)
  }

  public async brandUpdatePayloadValidate(payload: BrandUpdateDto) {
    return this.validateBySchema<BrandUpdateDto>(payload, this.brandUpdateSchema)
  }
}
