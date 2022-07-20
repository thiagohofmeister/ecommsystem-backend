import { Schema } from 'joi'
import * as Joi from 'joi'
import { JoiSchemaValidatorContract } from '../../Core/Validators/JoiSchemaValidatorContract'
import { ProductCreateDto } from '../Dto/ProductCreateDto'

export class ProductValidator extends JoiSchemaValidatorContract {
  private productCreateSchema: Schema

  constructor() {
    super()

    this.productCreateSchema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      category: Joi.object({
        id: Joi.string().required()
      }).required(),
      id: Joi.string().required()
    })
  }

  public async productCreatePayloadValidate(payload: ProductCreateDto) {
    return this.validateBySchema<ProductCreateDto>(
      payload,
      this.productCreateSchema
    )
  }
}
