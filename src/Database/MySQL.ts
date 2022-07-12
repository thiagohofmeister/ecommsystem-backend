import { DataSource } from 'typeorm'
import * as typeORM from 'typeorm'
import * as path from 'path'

export class MySQL {
  private static dataSource: DataSource

  constructor() {}

  public async createDataSource(
    host: string,
    port: number,
    database: string,
    username: string,
    password: string,
    logging: boolean = true
  ) {
    MySQL.dataSource = new typeORM.DataSource({
      type: 'mysql',
      host,
      port,
      database,
      username,
      password,
      entities: [
        path.join(__dirname, '..', 'Entities', 'Dao', '*.ts'),
        path.join(__dirname, '..', 'Entities', 'Dao', '*.js')
      ],
      logging
    })
  }

  public async initialize() {
    await MySQL.dataSource.initialize()

    console.info('Database MySQL initialized.')
  }

  public static getDataSource(): DataSource {
    return this.dataSource
  }
}
