import { IViewResponse, ViewContract } from 'ecommsystem-core'

import { Category } from '../Models/Category'

export class CategoryView extends ViewContract<Category, CategoryResponse> {
  protected renderOne(entity: Category): CategoryResponse {
    return {
      id: entity.getId(),
      label: entity.getLabel(),
      urn: entity.getUrn(),
      description: entity.getDescription(),
      parent: entity.getParent() ? this.renderOne(entity.getParent()) : null,
      createdAt: entity.getCreatedAt(),
      updatedAt: entity.getUpdatedAt() || null
    }
  }
}

export interface CategoryResponse extends IViewResponse {
  id: string
  label: string
  urn: string
  description: string
  parent: CategoryResponse | null
  createdAt: Date
  updatedAt: Date
}
