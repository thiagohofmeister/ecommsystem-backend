import { IEventPayload } from '../../../Core/Models/Interfaces/IEventPayload'

export interface CategoryCreatedEventDto extends IEventPayload {
  categoryId: string
}
