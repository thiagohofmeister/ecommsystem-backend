import { Schema } from 'joi'
import * as Joi from 'joi'
import { JoiSchemaValidatorContract } from '../../Core/Validators/JoiSchemaValidatorContract'
import { CategoryCreateDto } from '../Dto/CategoryCreateDto'

export class CategoryValidator extends JoiSchemaValidatorContract {
  private categoryCreateSchema: Schema

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
  }

  public async categoryCreatePayloadValidate(payload: CategoryCreateDto) {
    return this.validateBySchema<CategoryCreateDto>(
      payload,
      this.categoryCreateSchema
    )
  }
}
