import { AmqpQueueContract } from '../../Core/Modules/Queue/AmqpQueueContract'

export class CategoryQueue extends AmqpQueueContract {
  constructor(url: string) {
    super(url, 'category')
  }
}
