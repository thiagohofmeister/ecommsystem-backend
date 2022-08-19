import { IEventPayload } from 'ecommsystem-core'

export interface CategorySavedEventDto extends IEventPayload {
  categoryId: string
}
