import { RedisClientType, createClient } from 'redis'

export class Redis {
  private static client: RedisClientType

  public async createClient() {
    Redis.client = createClient({
      url: process.env.REDIS_URL
    })

    Redis.client.on('ready', () => console.info('Database Redis initialized.'))
    Redis.client.on('error', () => console.error('Redis Client Error'))

    await Redis.client.connect()
  }

  public static getClient(): RedisClientType {
    return this.client
  }
}
