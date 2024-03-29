import * as cors from 'cors'
import * as dotenv from 'dotenv'
import { ErrorHandler } from 'ecommsystem-core'
import * as express from 'express'

import { MySQL } from './Database/MySQL'
import { Redis } from './Database/Redis'
import { RoutesHandler } from './Routes/RoutesHandler'

class Api {
  private app

  constructor(private readonly routesHandler: RoutesHandler) {
    dotenv.config()
    this.app = express()

    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(cors())

    this.app.set('port', process.env.APP_PORT || 3000)

    this.app.use(this.routesHandler.getRouter())

    const errorHandler = new ErrorHandler()

    this.app.use(errorHandler.error)
    this.app.use(errorHandler.notFound)
  }

  private async afterInitialized() {
    await new MySQL().createDataSource()
    await new Redis().createClient()
  }

  public start() {
    this.app.listen(this.app.get('port'), async () => {
      console.info(
        'App is running at http://localhost:%d in %s mode',
        this.app.get('port'),
        this.app.get('env')
      )

      await this.afterInitialized()
    })
  }
}

new Api(new RoutesHandler()).start()
