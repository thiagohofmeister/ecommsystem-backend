import { IViewResponse, ViewContract } from 'ecommsystem-core'

import { Warehouse } from '../Models/Warehouse'

export class WarehouseView extends ViewContract<Warehouse> {
  protected renderOne(entity: Warehouse): WarehouseResponse {
    return {
      id: entity.getId(),
      name: entity.getName(),
      address: {
        zipCode: entity.getAddressZipCode(),
        state: entity.getAddressState(),
        city: entity.getAddressCity(),
        district: entity.getAddressDistrict(),
        street: entity.getAddressStreet(),
        number: entity.getAddressNumber(),
        complement: entity.getAddressComplement()
      },
      createdAt: entity.getCreatedAt(),
      updatedAt: entity.getUpdatedAt() || null
    }
  }
}

export interface WarehouseResponse extends IViewResponse {
  id: string
  name: string
  address: {
    zipCode: string
    state: string
    city: string
    district: string
    street: string
    number: string
    complement: string
  }
  createdAt: Date
  updatedAt: Date
}
