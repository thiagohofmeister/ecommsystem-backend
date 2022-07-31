import { ViewContract } from '../../../Core/Views/Contracts/ViewContract'
import { IViewResponse } from '../../../Core/Views/Interfaces/IViewResponse'
import { Warehouse } from '../Models/Warehouse'

export class WarehouseView extends ViewContract<Warehouse> {
  protected renderOne(entity: Warehouse): WarehouseResponse {
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

export interface WarehouseResponse extends IViewResponse {
  id: string
  label: string
  urn: string
  description: string
  createdAt: Date
  updatedAt: Date
}
