import { MeasureUnitEnum } from '../Enums/MeasureUnitEnum'
import { WeightUnitEnum } from '../Enums/WeightUnitEnum'

export interface VariationSaveDto {
  width: number
  length: number
  height: number
  weight: number
  measuresUnit: MeasureUnitEnum
  weightUnit: WeightUnitEnum
  attributes: {
    attribute: {
      id: string
    }
    value: string
  }[]
}
