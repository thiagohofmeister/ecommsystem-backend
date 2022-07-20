import { DataNotFoundException } from '../../Core/Models/Exceptions/DataNotFoundException'

export class CategoryDataNotFound extends DataNotFoundException {
  constructor() {
    super('Category data not found.')
  }
}
