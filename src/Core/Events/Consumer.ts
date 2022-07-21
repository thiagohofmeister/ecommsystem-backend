import { ConsumeMessage } from 'amqplib'
import { FacadeFactory } from '../Factories/FacadeFactory'

export class Consumer {
  constructor(private readonly facadeFactory: FacadeFactory) {
    this.consume = this.consume.bind(this)
  }

  public consume(msg: ConsumeMessage) {
    const messageId = msg.properties.messageId
    const payload = JSON.parse(msg.content.toString())

    if (!this[messageId]) {
      console.error(`MessageId (${messageId}) not implemented.`)
      return
    }

    this[messageId](payload)
  }

  public async categoryCreated(payload: any) {
    await this.facadeFactory.buildCategoryFacade().getTree(true)
  }
}
