import { IEventPayload } from '../../../Core/Models/Interfaces/IEventPayload'

export interface CategorySavedEventDto extends IEventPayload {
  categoryId: string
}
