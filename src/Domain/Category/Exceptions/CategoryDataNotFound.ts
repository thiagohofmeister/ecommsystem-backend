import { DataNotFoundException } from 'ecommsystem-core'

export class CategoryDataNotFound extends DataNotFoundException {
  constructor() {
    super('Category data not found.')
  }
}
