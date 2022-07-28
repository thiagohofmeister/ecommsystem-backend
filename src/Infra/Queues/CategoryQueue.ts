import { AmqpQueueContract } from '../../Core/Modules/Queue/AmqpQueueContract'
import { CategorySavedEventDto } from '../../Domain/Category/Dto/CategorySavedEventDto'

export class CategoryQueue extends AmqpQueueContract<CategorySavedEventDto> {
  constructor(url: string) {
    super(url, 'category')
  }
}
