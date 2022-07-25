import { ViewContract } from '../../../Core/Views/Contracts/ViewContract'
import { IViewResponse } from '../../../Core/Views/Interfaces/IViewResponse'
import { Brand } from '../Models/Brand'

export class BrandView extends ViewContract<Brand> {
  protected renderOne(entity: Brand): BrandResponse {
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

export interface BrandResponse extends IViewResponse {
  id: string
  label: string
  urn: string
  description: string
  createdAt: Date
  updatedAt: Date
}
