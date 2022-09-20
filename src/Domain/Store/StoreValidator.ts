import { JoiSchemaValidatorContract } from 'ecommsystem-core'
import { Schema } from 'joi'
import * as Joi from 'joi'

import { StoreCreateDto } from './Dto/StoreCreateDto'

export class StoreValidator extends JoiSchemaValidatorContract {
  private storeCreateSchema: Schema

  constructor() {
    super()

    this.storeCreateSchema = Joi.object({
      name: Joi.string().required(),
      document: Joi.object({
        type: Joi.string().required(),
        number: Joi.string().required(),
        name: Joi.string().required()
      }).required(),
      email: Joi.string().required(),
      phone: Joi.string().required()
    })
  }

  public async storeCreatePayloadValidate(payload: StoreCreateDto) {
    return this.validateBySchema<StoreCreateDto>(
      payload,
      this.storeCreateSchema
    )
  }
}
