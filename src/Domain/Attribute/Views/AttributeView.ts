import { IViewResponse, ViewContract } from 'ecommsystem-core'

import { Attribute } from '../Models/Attribute'

export class AttributeView extends ViewContract<Attribute, AttributeResponse> {
  protected renderOne(entity: Attribute): AttributeResponse {
    return {
      id: entity.getId(),
      label: entity.getLabel(),
      values: entity.getValues()
    }
  }
}

export interface AttributeResponse extends IViewResponse {
  id: string
  label: string
  values: string
}
