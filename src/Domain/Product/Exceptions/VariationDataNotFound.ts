import { DataNotFoundException } from '../../../Core/Models/Exceptions/DataNotFoundException'

export class VariationDataNotFound extends DataNotFoundException {
  constructor() {
    super('Variation data not found.')
  }
}
