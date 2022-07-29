import { ProductVariationTemplate } from '../Interfaces/ProductVariationTemplate'
import { ProductSaveImageDto } from './ProductSaveImageDto'
import { VariationSaveDto } from '../../Variation/Dto/VariationSaveDto'

export interface ProductUpdateDto {
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
  images: ProductSaveImageDto[]
  variations: ({ sku: string } & VariationSaveDto)[]
}
