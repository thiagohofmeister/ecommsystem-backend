import { CategoryQueue } from '../../Infra/Queues/CategoryQueue'

export class QueueFactory {
  constructor(private readonly url: string) {}

  public buildCategoryQueue() {
    return new CategoryQueue(this.url)
  }
}
