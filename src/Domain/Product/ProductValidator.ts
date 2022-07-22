import { Schema } from 'joi'
import * as Joi from 'joi'
import { JoiSchemaValidatorContract } from '../../Core/Validators/JoiSchemaValidatorContract'
import { ProductCreateDto } from './Dto/ProductCreateDto'
import { ProductSaveVariationDto } from './Dto/ProductSaveVariationDto'
import { MeasureUnitEnum } from './Enums/MeasureUnitEnum'
import { WeightUnitEnum } from './Enums/WeightUnitEnum'

export class ProductValidator extends JoiSchemaValidatorContract {
  private productCreateSchema: Schema
  private productSaveVariationSchema: Schema

  constructor() {
    super()

    this.productSaveVariationSchema = Joi.object({
      width: Joi.number().required(),
      length: Joi.number().required(),
      height: Joi.number().required(),
      weight: Joi.number().required(),
      measuresUnit: Joi.string().valid(...Object.keys(MeasureUnitEnum)),
      weightUnit: Joi.string().valid(...Object.keys(WeightUnitEnum))
    })

    this.productCreateSchema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      brand: Joi.object({
        id: Joi.string().required()
      }).required(),
      category: Joi.object({
        id: Joi.string().required()
      }).required(),
      id: Joi.string().required(),
      variations: Joi.array()
        .items(
          this.productSaveVariationSchema.concat(
            Joi.object({
              sku: Joi.string().required()
            })
          )
        )
        .optional()
    })
  }

  public async productCreatePayloadValidate(payload: ProductCreateDto) {
    return this.validateBySchema<ProductCreateDto>(
      payload,
      this.productCreateSchema
    )
  }

  public async productSaveVariationPayloadValidate(
    payload: ProductSaveVariationDto
  ) {
    return this.validateBySchema<ProductSaveVariationDto>(
      payload,
      this.productSaveVariationSchema
    )
  }
}
