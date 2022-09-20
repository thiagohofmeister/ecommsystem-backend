import { ViewContract } from 'ecommsystem-core'

import { DocumentTypeEnum } from '../../Store/Enums/DocumentTypeEnum'
import { UserStatusEnum } from '../../User/Enums/UserStatusEnum'
import { Register } from '../Models/Register'

export class RegisterView extends ViewContract<Register, RegisterResponse> {
  protected renderOne(entity: Register): RegisterResponse {
    return {
      user: {
        id: entity.getUser().getId(),
        name: entity.getUser().getName(),
        documentNumber: entity.getUser().getDocumentNumber(),
        email: entity.getUser().getEmail(),
        status: entity.getUser().getStatus()
      },
      store: {
        id: entity.getStore().getId(),
        name: entity.getStore().getName(),
        document: {
          type: entity.getStore().getDocumentType(),
          number: entity.getStore().getDocumentNumber(),
          name: entity.getStore().getDocumentName()
        },
        email: entity.getStore().getEmail(),
        phone: entity.getStore().getPhone()
      }
    }
  }
}

export interface RegisterResponse {
  user: {
    id: string
    name: string
    documentNumber: string
    email: string
    status: UserStatusEnum
  }
  store: {
    id: string
    name: string
    document: {
      type: DocumentTypeEnum
      number: string
      name: string
    }
    email: string
    phone: string
  }
}
