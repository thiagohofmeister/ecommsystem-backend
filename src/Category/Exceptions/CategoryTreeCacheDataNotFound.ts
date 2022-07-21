import { DataNotFoundException } from '../../Core/Models/Exceptions/DataNotFoundException'

export class CategoryTreeCacheDataNotFound extends DataNotFoundException {
  constructor() {
    super('CategoryTreeCache data not found.')
  }
}
