import { DataSource } from 'typeorm'
import * as typeORM from 'typeorm'
import * as path from 'path'

export class MongoDB {
  private static dataSource: DataSource

  public async createDataSource() {
    MongoDB.dataSource = new typeORM.DataSource({
      type: 'mongodb',
      host: process.env.MONGODB_HOST,
      port: parseInt(process.env.MONGODB_PORT),
      database: process.env.MONGODB_DATABASE,
      entities: [
        path.join(__dirname, '..', 'Entities', 'Dao', '*.ts'),
        path.join(__dirname, '..', 'Entities', 'Dao', '*.js')
      ],
      logging: true
    })

    try {
      await MongoDB.dataSource.initialize()
      console.info('Database MongoDB initialized.')
    } catch (e) {
      console.error('Error to initialize Database MongoDB:', { e })
    }
  }

  public static getDataSource(): DataSource {
    return this.dataSource
  }
}
