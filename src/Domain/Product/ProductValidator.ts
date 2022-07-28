import { Schema } from 'joi'
import * as Joi from 'joi'
import { JoiSchemaValidatorContract } from '../../Core/Validators/JoiSchemaValidatorContract'
import { ProductCreateDto } from './Dto/ProductCreateDto'
import { ProductSaveVariationDto } from './Dto/ProductSaveVariationDto'
import { MeasureUnitEnum } from './Enums/MeasureUnitEnum'
import { WeightUnitEnum } from './Enums/WeightUnitEnum'
import { ProductUpdateDto } from './Dto/ProductUpdateDto'

export class ProductValidator extends JoiSchemaValidatorContract {
  private productCreateSchema: Schema
  private productUpdateSchema: Schema
  private productSaveVariationSchema: Schema
  private productUpdateVariationSchema: Schema
  private variationAttributesSchema: Schema

  constructor() {
    super()

    this.variationAttributesSchema = Joi.array()
      .items(
        Joi.object({
          id: Joi.string().required(),
          value: Joi.string().required()
        })
      )
      .optional()

    this.productSaveVariationSchema = Joi.object({
      width: Joi.number().required(),
      length: Joi.number().required(),
      height: Joi.number().required(),
      weight: Joi.number().required(),
      measuresUnit: Joi.string()
        .valid(...Object.keys(MeasureUnitEnum))
        .required(),
      weightUnit: Joi.string()
        .valid(...Object.keys(WeightUnitEnum))
        .required(),
      attributes: this.variationAttributesSchema
    })

    this.productUpdateVariationSchema = Joi.object({
      width: Joi.number(),
      length: Joi.number(),
      height: Joi.number(),
      weight: Joi.number(),
      measuresUnit: Joi.string().valid(...Object.keys(MeasureUnitEnum)),
      weightUnit: Joi.string().valid(...Object.keys(WeightUnitEnum)),
      attributes: this.variationAttributesSchema
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
      images: Joi.array()
        .items(
          Joi.object({
            url: Joi.string().required(),
            value: Joi.string().allow(null).required()
          })
        )
        .optional(),
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

    this.productUpdateSchema = Joi.object({
      title: Joi.string(),
      description: Joi.string(),
      active: Joi.boolean(),
      brand: Joi.object({
        id: Joi.string().required()
      }),
      category: Joi.object({
        id: Joi.string().required()
      }),
      images: Joi.array()
        .items(
          Joi.object({
            id: Joi.string(),
            url: Joi.when('id', {
              is: Joi.exist(),
              then: Joi.string(),
              otherwise: Joi.string().required()
            }),
            value: Joi.when('id', {
              is: Joi.exist(),
              then: Joi.string().allow(null),
              otherwise: Joi.string().allow(null).required()
            })
          })
        )
        .optional(),
      variations: Joi.array()
        .items(
          this.productUpdateVariationSchema.concat(
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

  public async productUpdatePayloadValidate(payload: ProductUpdateDto) {
    return this.validateBySchema<ProductUpdateDto>(
      payload,
      this.productUpdateSchema
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
