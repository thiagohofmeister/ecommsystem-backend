import { ProductVariationTemplate } from '../Interfaces/ProductVariationTemplate'
import { ProductSaveImageDto } from './ProductSaveImageDto'
import { ProductSaveVariationDto } from './ProductSaveVariationDto'

export interface ProductCreateDto {
  title: string
  description: string
  variationTemplate: ProductVariationTemplate
  active: boolean
  category: {
    id: string
  }
  brand: {
    id: string
  }
  id: string
  images: ProductSaveImageDto[]
  variations: ({ sku: string } & ProductSaveVariationDto)[]
}
