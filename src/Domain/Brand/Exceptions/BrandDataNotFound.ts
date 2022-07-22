import { DataNotFoundException } from '../../../Core/Models/Exceptions/DataNotFoundException'

export class BrandDataNotFound extends DataNotFoundException {
  constructor() {
    super('Brand data not found.')
  }
}
