import { ViewContract } from '../../Core/Views/Contracts/ViewContract'
import { Category } from '../Models/Category'

export class CategoryView extends ViewContract<Category, CategoryResponse> {
  render(entity: Category): CategoryResponse {
    return {
      id: entity.getId(),
      label: entity.getLabel(),
      urn: entity.getUrn(),
      description: entity.getDescription(),
      parent: entity.getParent() ? this.render(entity.getParent()) : null,
      createdAt: entity.getCreatedAt(),
      updatedAt: entity.getUpdatedAt() || null
    }
  }
}

export interface CategoryResponse {
  id: string
  label: string
  urn: string
  description: string
  parent: CategoryResponse
  createdAt: Date
  updatedAt: Date
}
