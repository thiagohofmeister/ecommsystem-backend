import { ViewContract } from '../../../Core/Views/Contracts/ViewContract'
import { CategoryTree } from '../Models/CategoryTree'

export class CategoryTreeView extends ViewContract<
  CategoryTree,
  CategoryTreeResponse
> {
  render(entity: CategoryTree): CategoryTreeResponse {
    return {
      id: entity.getId(),
      label: entity.getLabel(),
      urn: entity.getUrn(),
      children: this.renderMany(entity.getChildren())
    }
  }
}

export interface CategoryTreeResponse {
  id: string
  label: string
  urn: string
  children: CategoryTreeResponse[]
}
