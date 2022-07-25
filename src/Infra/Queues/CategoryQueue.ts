import { AmqpQueueContract } from '../../Core/Modules/Queue/AmqpQueueContract'
import { CategoryCreatedEventDto } from '../../Domain/Category/Dto/CategoryCreatedEventDto'

export class CategoryQueue extends AmqpQueueContract<CategoryCreatedEventDto> {
  constructor(url: string) {
    super(url, 'category')
  }
}
