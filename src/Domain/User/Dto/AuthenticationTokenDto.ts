import { UserRoleTypeEnum } from '../Enums/UserRoleTypeEnum'

export interface AuthenticationTokenDto {
  user: {
    id: string
    name: string
    email: string
    roleType: UserRoleTypeEnum
  }
  store: {
    id: string
  }
}
