import { Router } from 'express'
import * as fs from 'fs'
import * as path from 'path'

import { CreateContext } from '../../Core/Middlewares/CreateContext'
import { AuthRouteContract } from './Contracts/AuthRouteContract'
import { RouteContract } from './Contracts/RouteContract'

export class RoutesHandler {
  private authRoutes: AuthRouteContract<any>[]
  private noAuthRoutes: RouteContract<any>[]

  constructor() {
    this.initializeRoutes = this.initializeRoutes.bind(this)
    this.getAuthMiddlewares = this.getAuthMiddlewares.bind(this)
    this.getDefaultMiddlewares = this.getDefaultMiddlewares.bind(this)
    this.getRouter = this.getRouter.bind(this)

    this.authRoutes = []
    this.noAuthRoutes = []

    this.initializeRoutes()
  }

  private initializeRoutes() {
    const routesDir = path.join(__dirname, 'Domains')

    const routesPath = fs.readdirSync(routesDir)

    routesPath.forEach(routePath => {
      const domainName = routePath.replace(/Routes\.\w+/, '')
      const Route = require(path.join(routesDir, routePath))[
        `${domainName}Routes`
      ]
      const Controller = require(path.join(
        __dirname,
        '..',
        '..',
        'Domain',
        domainName,
        `${domainName}Controller${routePath.replace(/\w+\./, '.')}`
      ))[`${domainName}Controller`]

      const route = new Route(new Controller())

      if (route instanceof AuthRouteContract) {
        this.authRoutes.push(route)
        return
      }

      this.noAuthRoutes.push(route)
    })
  }

  private getAuthMiddlewares() {
    return [new CreateContext().create]
  }

  private getDefaultMiddlewares() {
    return []
  }

  public getRouter() {
    const router = Router()

    this.getDefaultMiddlewares().forEach(middleware => router.use(middleware))

    for (let i = 0; i < this.noAuthRoutes.length; i++) {
      const route = this.noAuthRoutes[i]
      const routes = route.getRoutes()

      for (let j = 0; j < routes.length; j++) {
        const route = routes[j]
        router[route.getMethod()](route.getPath(), route.getHandle())
      }
    }

    this.getAuthMiddlewares().forEach(middleware => router.use(middleware))

    for (let i = 0; i < this.authRoutes.length; i++) {
      const route = this.authRoutes[i]
      const routes = route.getRoutes()

      for (let j = 0; j < routes.length; j++) {
        const route = routes[j]
        router[route.getMethod()](route.getPath(), route.getHandle())
      }
    }

    return router
  }
}
