import { ViewContract } from 'ecommsystem-core'

import { UserStatusEnum } from '../Enums/UserStatusEnum'
import { User } from '../Models/User'

export class UserView extends ViewContract<User, UserResponse> {
  protected renderOne(entity: User) {
    return {
      id: entity.getId(),
      name: entity.getName(),
      documentNumber: entity.getDocumentNumber(),
      email: entity.getEmail(),
      status: entity.getStatus()
    }
  }
}

interface UserResponse {
  id: string
  name: string
  documentNumber: string
  email: string
  status: UserStatusEnum
}
