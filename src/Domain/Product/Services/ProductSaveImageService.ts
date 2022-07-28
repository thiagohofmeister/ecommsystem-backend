import { ProductSaveImageDto } from '../Dto/ProductSaveImageDto'
import { Image } from '../Models/Image'
import { Product } from '../Models/Product'
import { ImageRepository } from '../Repositories/ImageRepository'

export class ProductSaveImageService {
  constructor(private readonly imageRepository: ImageRepository) {}

  async execute(
    product: Product | string,
    position: number,
    data: ProductSaveImageDto,
    image?: Image
  ) {
    // If variable product is string, then it's the product id.
    // So, we need to find the product with this id
    if (typeof product === 'string') {
      throw new Error('Method not implemented.')
    }

    const imageToSave = await this.getImage(image, product, position, data)

    if (!!image) {
      return await this.imageRepository.save(imageToSave)
    }

    return await this.imageRepository.create(imageToSave)
  }

  private async getImage(
    image: Image,
    product: Product,
    position: number,
    data: ProductSaveImageDto
  ) {
    if (!image) {
      return new Image(
        data.url,
        position,
        data.value,
        product.getStoreId(),
        null,
        product
      )
    }

    return image
  }
}
