import * as dotenv from 'dotenv'
import { Consumer } from '../Core/Events/Consumer'
import { Factory } from '../Core/Factories/Factory'
import { AmqpQueueContract } from '../Core/Modules/Queue/AmqpQueueContract'

class Worker {
  private queue: AmqpQueueContract
  private factory: Factory

  constructor() {
    dotenv.config()

    this.factory = Factory.getInstance()
  }

  public async start() {
    this.queue.consume(async msg => {
      const messageId = msg.properties.messageId
      const payload = JSON.parse(msg.content.toString())

      const consumer = new Consumer(this.factory.buildFacadeFactory())

      if (!consumer[messageId]) {
        console.error(`MessageId (${messageId}) not implemented.`)
        return
      }

      consumer[messageId](payload)
    })
  }
}

new Worker().start()
