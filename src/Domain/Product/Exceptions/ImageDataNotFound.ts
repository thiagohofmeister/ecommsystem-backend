import { DataNotFoundException } from '../../../Core/Models/Exceptions/DataNotFoundException'

export class ImageDataNotFound extends DataNotFoundException {
  constructor() {
    super('Image data not found.')
  }
}
