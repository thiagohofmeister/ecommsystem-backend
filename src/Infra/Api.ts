import * as express from 'express'
import * as cors from 'cors'
import { ErrorHandler } from '../Core/Middlewares/ErrorHandler'
import { RoutesHandler } from './Routes/RoutesHandler'
import { MySQL } from '../Core/Database/MySQL'
import * as dotenv from 'dotenv'

export class Api {
  private app

  constructor(private readonly routesHandler: RoutesHandler) {
    dotenv.config()
    this.app = express()
  }

  private create() {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(cors())

    this.app.set('port', process.env.APP_PORT || 3000)

    this.app.use(this.routesHandler.getRouter())

    const errorHandler = new ErrorHandler()

    this.app.use(errorHandler.error)
    this.app.use(errorHandler.notFound)
  }

  private async afterInitialize() {
    await new MySQL().createDataSource()
  }

  public listen() {
    this.create()

    this.app.listen(this.app.get('port'), async () => {
      console.info(
        'App is running at http://localhost:%d in %s mode',
        this.app.get('port'),
        this.app.get('env')
      )

      await this.afterInitialize()
    })
  }
}

new Api(new RoutesHandler()).listen()
