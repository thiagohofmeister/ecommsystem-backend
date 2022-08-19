import { DataNotFoundException } from 'ecommsystem-core'

export class ImageDataNotFound extends DataNotFoundException {
  constructor() {
    super('Image data not found.')
  }
}
