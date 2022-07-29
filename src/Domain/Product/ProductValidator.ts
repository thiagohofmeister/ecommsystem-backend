import { Schema } from 'joi'
import * as Joi from 'joi'

import { JoiSchemaValidatorContract } from '../../Core/Validators/JoiSchemaValidatorContract'
import { ProductCreateDto } from './Dto/ProductCreateDto'
import { ProductSaveVariationDto } from './Dto/ProductSaveVariationDto'
import { ProductUpdateDto } from './Dto/ProductUpdateDto'
import { MeasureUnitEnum } from './Enums/MeasureUnitEnum'
import { WeightUnitEnum } from './Enums/WeightUnitEnum'

export class ProductValidator extends JoiSchemaValidatorContract {
  private productCreateSchema: Schema
  private productUpdateSchema: Schema
  private productSaveVariationSchema: Schema
  private productUpdateVariationSchema: Schema
  private variationAttributesSchema: Schema
  private variationTemplateSchema: Schema

  constructor() {
    super()

    this.variationTemplateSchema = Joi.object({
      images: Joi.string(),
      attributes: Joi.array()
        .items(
          Joi.object({
            id: Joi.string().required(),
            label: Joi.string()
          })
        )
        .min(1)
        .required()
    })
      .allow(null)
      .required()

    this.variationAttributesSchema = Joi.array()
      .items(
        Joi.object({
          attribute: Joi.object({
            id: Joi.string().required()
          }).required(),
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
      variationTemplate: this.variationTemplateSchema,
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
      variations: Joi.when('variationTemplate', {
        is: Joi.equal(null),
        then: Joi.array()
          .items(
            this.productUpdateVariationSchema.concat(
              Joi.object({
                sku: Joi.string().required()
              })
            )
          )
          .min(1)
          .max(1)
          .optional(),
        otherwise: Joi.array()
          .items(
            this.productUpdateVariationSchema.concat(
              Joi.object({
                sku: Joi.string().required()
              })
            )
          )
          .min(1)
          .optional()
      })
    })

    this.productUpdateSchema = Joi.object({
      title: Joi.string(),
      description: Joi.string(),
      variationTemplate: this.variationTemplateSchema,
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
      variations: Joi.when('variationTemplate', {
        is: Joi.equal(null),
        then: Joi.array()
          .items(
            this.productUpdateVariationSchema.concat(
              Joi.object({
                sku: Joi.string().required()
              })
            )
          )
          .min(1)
          .max(1)
          .optional(),
        otherwise: Joi.array()
          .items(
            this.productUpdateVariationSchema.concat(
              Joi.object({
                sku: Joi.string().required()
              })
            )
          )
          .min(1)
          .optional()
      })
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
