import { ViewContract } from '../../../Core/Views/Contracts/ViewContract'
import { Brand } from '../Models/Brand'

export class BrandView extends ViewContract<Brand, BrandResponse> {
  render(entity: Brand): BrandResponse {
    return {
      id: entity.getId(),
      label: entity.getLabel(),
      urn: entity.getUrn(),
      description: entity.getDescription(),
      createdAt: entity.getCreatedAt(),
      updatedAt: entity.getUpdatedAt() || null
    }
  }
}

export interface BrandResponse {
  id: string
  label: string
  urn: string
  description: string
  createdAt: Date
  updatedAt: Date
}
