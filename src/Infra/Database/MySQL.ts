import { DataSource } from 'typeorm'
import * as typeORM from 'typeorm'
import * as path from 'path'

export class MySQL {
  private static dataSource: DataSource

  constructor() {}

  public async createDataSource() {
    MySQL.dataSource = new typeORM.DataSource({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT),
      database: process.env.MYSQL_DATABASE,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      entities: [
        path.join(__dirname, '..', '..', 'Infra', 'Models', '*.ts'),
        path.join(__dirname, '..', '..', 'Infra', 'Models', '*.js')
      ],
      logging: true,
      bigNumberStrings: false,
      supportBigNumbers: true,
      timezone: 'America/Sao_Paulo'
    })

    try {
      await MySQL.dataSource.initialize()
      console.info('Database MySQL initialized.')
    } catch (e) {
      console.error('Error to initialize Database MySQL:', { e })
    }
  }

  public static getDataSource(): DataSource {
    return this.dataSource
  }
}
