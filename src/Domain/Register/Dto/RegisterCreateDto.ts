import { StoreCreateDto } from '../../Store/Dto/StoreCreateDto'
import { UserCreateDto } from '../../User/Dto/UserCreateDto'

export interface RegisterCreateDto {
  user: UserCreateDto
  store: StoreCreateDto
}
