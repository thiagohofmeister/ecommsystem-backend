import { Schema } from 'joi'
import * as Joi from 'joi'
import { JoiSchemaValidatorContract } from '../../Core/Validators/JoiSchemaValidatorContract'
import { BrandCreateDto } from './Dto/BrandCreateDto'

export class BrandValidator extends JoiSchemaValidatorContract {
  private brandCreateSchema: Schema

  constructor() {
    super()

    this.brandCreateSchema = Joi.object({
      label: Joi.string().required(),
      urn: Joi.string().optional(),
      description: Joi.string().required()
    })
  }

  public async brandCreatePayloadValidate(payload: BrandCreateDto) {
    return this.validateBySchema<BrandCreateDto>(
      payload,
      this.brandCreateSchema
    )
  }
}
