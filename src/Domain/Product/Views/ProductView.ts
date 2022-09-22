import { ViewContract } from 'ecommsystem-core'

import { MeasureUnitEnum } from '../../Variation/Enums/MeasureUnitEnum'
import { WeightUnitEnum } from '../../Variation/Enums/WeightUnitEnum'
import { ProductVariationTemplate } from '../Interfaces/ProductVariationTemplate'
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
      variationTemplate: entity.getVariationTemplate(),
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
        attributes: variation.getAttributes().map(attr => ({
          attribute: {
            id: attr.getAttribute().getId()
          },
          value: attr.getValue()
        })),
        images: variation.getImages().map(image => ({
          id: image.getId(),
          url: image.getUrl(),
          value: image.getValue()
        })),
        price: variation.getCurrentPrice()
          ? {
              id: variation.getCurrentPrice().getId(),
              list: variation.getCurrentPrice().getList(),
              sale: variation.getCurrentPrice().getSale(),
              campaign: null
            }
          : null,
        stocks: variation.getStocks().map(stock => ({
          quantity: stock.getQuantity(),
          warehouse: {
            id: stock.getWarehouse().getId()
          }
        })),
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
  variationTemplate: ProductVariationTemplate
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
    attributes: {
      attribute: {
        id: string
      }
      value: string
    }[]
    images: {
      id: string
      url: string
      value: string
    }[]
    price: {
      id: string
      list: number
      sale: number
      campaign?: {
        id: string
      }
    }
    stocks: {
      quantity: number
      warehouse: {
        id: string
      }
    }[]
    createdAt: Date
    updatedAt: Date
  }[]
  createdAt: Date
  updatedAt: Date
}
