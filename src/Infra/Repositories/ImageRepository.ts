import { TypeOrmMysqlRepositoryContract } from 'ecommsystem-core'

import { Image } from '../../Domain/Product/Models/Image'
import { ImageRepository } from '../../Domain/Product/Repositories/ImageRepository'
import { ImageDao } from '../Models/ImageDao'

export class ImageRepositoryImpl
  extends TypeOrmMysqlRepositoryContract<Image, ImageDao>
  implements ImageRepository {}
