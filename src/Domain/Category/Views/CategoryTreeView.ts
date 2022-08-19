import { ViewContract } from 'ecommsystem-core'

import { CategoryTree } from '../Models/CategoryTree'

export class CategoryTreeView extends ViewContract<
  CategoryTree,
  CategoryTreeResponse
> {
  protected renderOne(entity: CategoryTree): CategoryTreeResponse {
    return {
      id: entity.getId(),
      label: entity.getLabel(),
      urn: entity.getUrn(),
      children: entity.getChildren()
        ? this.renderMany(entity.getChildren())
        : null
    }
  }
}

export interface CategoryTreeResponse {
  id: string
  label: string
  urn: string
  children?: CategoryTreeResponse[]
}
