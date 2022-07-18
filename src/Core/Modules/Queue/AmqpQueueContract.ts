import { Channel, connect, ConsumeMessage } from 'amqplib'

export abstract class AmqpQueueContract {
  constructor(private readonly url: string, private readonly queue: string) {}

  public async sendToQueue(messageId: string, message: {}) {
    const channel = await this.connect()
    await this.createQueue(channel, this.queue)
    console.info('Sending message')
    channel.sendToQueue(this.queue, Buffer.from(JSON.stringify(message)), {
      messageId
    })
  }

  public async consume(action: (msg: ConsumeMessage | null) => void) {
    const channel = await this.connect()
    await this.createQueue(channel, this.queue)
    channel.consume(
      this.queue,
      msg => {
        console.info('Consuming message')
        action(msg)
        channel.ack(msg)
      },
      { noAck: false }
    )
  }

  private async createQueue(channel: Channel, queue: string) {
    return await channel.assertQueue(queue, { durable: true })
  }

  private async connect() {
    return await (await connect(this.url)).createChannel()
  }
}
