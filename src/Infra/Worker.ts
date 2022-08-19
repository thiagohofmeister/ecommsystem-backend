import * as dotenv from 'dotenv'
import { Consumer } from 'ecommsystem-core'

import { Factory } from '../Shared/Factories/Factory'
import { QueueFactory } from '../Shared/Factories/QueueFactory'
import { MySQL } from './Database/MySQL'
import { Redis } from './Database/Redis'

class Worker {
  private queueFactory: QueueFactory

  constructor() {
    dotenv.config()

    this.queueFactory = Factory.getInstance().buildQueueFactory()
  }

  private async beforeStart() {
    await new MySQL().createDataSource()
    await new Redis().createClient()
  }

  public async start() {
    await this.beforeStart()

    const categoryQueue = this.queueFactory.buildCategoryQueue()
    categoryQueue.consume(Consumer.getInstance().consume)
  }
}

new Worker().start()
