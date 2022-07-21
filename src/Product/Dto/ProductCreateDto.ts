import { ProductSaveVariationDto } from './ProductSaveVariationDto'

export interface ProductCreateDto {
  title: string
  description: string
  category: {
    id: string
  }
  id: string
  variations: ({ sku: string } & ProductSaveVariationDto)[]
}
