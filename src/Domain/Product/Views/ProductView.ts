import { ViewContract } from '../../../Core/Views/Contracts/ViewContract'
import { MeasureUnitEnum } from '../Enums/MeasureUnitEnum'
import { WeightUnitEnum } from '../Enums/WeightUnitEnum'
import { Product } from '../Models/Product'

export class ProductView extends ViewContract<Product, ProductResponse> {
  constructor() {
    super()
  }

  renderOne(entity: Product): ProductResponse {
    return {
      id: entity.getId(),
      title: entity.getTitle(),
      description: entity.getDescription(),
      active: entity.isActive(),
      category: {
        id: entity.getCategory().getId(),
        urn: entity.getCategory().getUrn(),
        label: entity.getCategory().getLabel()
      },
      brand: {
        id: entity.getBrand().getId(),
        urn: entity.getBrand().getUrn(),
        label: entity.getBrand().getLabel()
      },
      images: entity.getImages().map(image => ({
        id: image.getId(),
        url: image.getUrl(),
        value: image.getValue()
      })),
      variations: entity.getVariations().map(variation => ({
        sku: variation.getSku(),
        width: variation.getWidth(),
        length: variation.getLength(),
        height: variation.getHeight(),
        weight: variation.getWeight(),
        measuresUnit: variation.getMeasuresUnit(),
        weightUnit: variation.getWeightUnit(),
        createdAt: variation.getCreatedAt(),
        updatedAt: variation.getUpdatedAt()
      })),
      createdAt: entity.getCreatedAt(),
      updatedAt: entity.getUpdatedAt()
    }
  }
}

export interface ProductResponse {
  id: string
  title: string
  description: string
  active: boolean
  category: {
    id: string
    urn: string
    label: string
  }
  brand: {
    id: string
    urn: string
    label: string
  }
  images: {
    id: string
    url: string
    value: string
  }[]
  variations: {
    sku: string
    width: number
    length: number
    height: number
    weight: number
    measuresUnit: MeasureUnitEnum
    weightUnit: WeightUnitEnum
    product?: Product
    createdAt?: Date
    updatedAt?: Date
  }[]
  createdAt: Date
  updatedAt: Date
}
