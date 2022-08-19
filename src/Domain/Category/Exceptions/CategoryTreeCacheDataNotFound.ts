import { DataNotFoundException } from 'ecommsystem-core'

export class CategoryTreeCacheDataNotFound extends DataNotFoundException {
  constructor() {
    super('CategoryTreeCache data not found.')
  }
}
