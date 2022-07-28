import { ProductSaveVariationDto } from './ProductSaveVariationDto'

export interface ProductUpdateDto {
  title: string
  description: string
  category: {
    id: string
  }
  brand: {
    id: string
  }
  variations: ({ sku: string } & ProductSaveVariationDto)[]
}
