import { Factory } from './Factories/Factory'
import * as dotenv from 'dotenv'
import { Consumer } from './Events/Consumer'
import { MySQL } from './Database/MySQL'
import { AmqpQueueContract } from './Modules/Queue/AmqpQueueContract'

dotenv.config()
;(async () => {
  await new MySQL().createDataSource(
    process.env.MYSQL_HOST,
    parseInt(process.env.MYSQL_PORT),
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASS
  )

  const factory = Factory.getInstance()
  const queue: AmqpQueueContract = null

  queue.consume(async msg => {
    const messageId = msg.properties.messageId
    const payload = JSON.parse(msg.content.toString())

    const consumer = new Consumer(factory.buildFacadeFactory())

    if (!consumer[messageId]) {
      console.error(`MessageId (${messageId}) not implemented.`)
      return
    }

    consumer[messageId](payload)
  })
})()
