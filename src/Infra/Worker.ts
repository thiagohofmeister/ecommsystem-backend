import * as dotenv from 'dotenv'
import { Consumer } from '../Core/Events/Consumer'
import { Factory } from '../Core/Factories/Factory'
import { MySQL } from './Database/MySQL'
import { Redis } from './Database/Redis'

class Worker {
  private factory: Factory

  constructor() {
    dotenv.config()

    this.factory = Factory.getInstance()
  }

  private async beforeStart() {
    await new MySQL().createDataSource()
    await new Redis().createClient()
  }

  public async start() {
    await this.beforeStart()

    // TODO: Start one consumer for each storeID

    const consumer = new Consumer(this.factory.buildFacadeFactory(null))

    const categoryQueue = this.factory.buildQueueFactory().buildCategoryQueue()
    categoryQueue.consume(consumer.consume)
  }
}

new Worker().start()
