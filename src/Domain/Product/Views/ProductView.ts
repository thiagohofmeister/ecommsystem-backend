import {
  CategoryResponse,
  CategoryView
} from '../../Category/Views/CategoryView'
import { ViewContract } from '../../../Core/Views/Contracts/ViewContract'
import { Product } from '../Models/Product'

export class ProductView extends ViewContract<Product, ProductResponse> {
  constructor(readonly categoryView?: CategoryView) {
    super()
  }

  renderOne(entity: Product): ProductResponse {
    return {
      id: entity.getId(),
      title: entity.getTitle(),
      description: entity.getDescription(),
      active: entity.isActive(),
      category:
        this.categoryView && entity.getCategory()
          ? (this.categoryView.render(entity.getCategory()) as CategoryResponse)
          : null,
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
  category: CategoryResponse
  createdAt: Date
  updatedAt: Date
}
