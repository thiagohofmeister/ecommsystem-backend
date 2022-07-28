import { In, Not } from 'typeorm'
import { ImageRepository } from '../Repositories/ImageRepository'

export class ProductDeleteUnusedImagesService {
  constructor(private readonly imageRepository: ImageRepository) {}

  public async execute(
    productId: string,
    storeId: string,
    idsToKeep: string | string[]
  ) {
    if (typeof idsToKeep === 'string') {
      idsToKeep = [idsToKeep]
    }

    return this.imageRepository.delete({
      id: Not(In(idsToKeep)),
      product: { id: productId, storeId }
    })
  }
}
