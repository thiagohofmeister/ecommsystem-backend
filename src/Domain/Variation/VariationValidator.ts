import { JoiSchemaValidatorContract } from 'ecommsystem-core'
import { Schema } from 'joi'
import * as Joi from 'joi'

import { VariationSavePricesDto } from './Dto/VariationSaveStocksDto'

export class VariationValidator extends JoiSchemaValidatorContract {
  private variationSavePricesSchema: Schema

  constructor() {
    super()

    this.variationSavePricesSchema = Joi.array()
      .items(
        Joi.object({
          warehouse: Joi.object({
            id: Joi.string().required()
          })
            .allow(null)
            .required(),
          quantity: Joi.number().required()
        })
      )
      .min(1)
  }

  public async variationSaveStocksPayloadValidate(
    payload: VariationSavePricesDto[]
  ) {
    return this.validateBySchema<VariationSavePricesDto[]>(
      payload,
      this.variationSavePricesSchema
    )
  }
}
