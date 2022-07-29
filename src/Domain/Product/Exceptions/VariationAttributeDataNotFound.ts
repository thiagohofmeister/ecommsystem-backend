import { DataNotFoundException } from '../../../Core/Models/Exceptions/DataNotFoundException'

export class VariationAttributeDataNotFound extends DataNotFoundException {
  constructor() {
    super('VariationAttribute data not found.')
  }
}
