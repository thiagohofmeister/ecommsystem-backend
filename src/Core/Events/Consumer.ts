import { ConsumeMessage } from 'amqplib'
import { FacadeFactory } from '../Factories/FacadeFactory'
import { Factory } from '../Factories/Factory'
import { IEventPayload } from '../Models/Interfaces/IEventPayload'

export class Consumer {
  private static instance: Consumer

  private constructor() {
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

  public static getInstance() {
    if (!this.instance) {
      this.instance = new Consumer()
    }

    return this.instance
  }

  public async categoryCreated(payload: IEventPayload) {
    const facadeFactory = Factory.getInstance().buildFacadeFactory(
      payload.storeId
    )

    await facadeFactory.buildCategoryFacade().getTree(true)
  }
}
