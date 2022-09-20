import { Router } from 'express'
import * as fs from 'fs'
import * as path from 'path'

import { AuthMiddleware } from '../Middlewares/AuthMiddleware'
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
    const routesDomainDir = path.join(__dirname, 'Domains')
    const domainDir = path.join(__dirname, '..', '..', 'Domain')

    const routesPath = fs.readdirSync(routesDomainDir)

    routesPath.forEach(routePath => {
      const [domainName, ext] = routePath.split('Routes')
      const Route = require(path.join(routesDomainDir, routePath))[`${domainName}Routes`]

      const controllerPath = path.join(domainDir, domainName, `${domainName}Controller${ext}`)

      if (!fs.existsSync(controllerPath)) {
        return
      }

      const Controller = require(controllerPath)[`${domainName}Controller`]

      const route = new Route(new Controller())

      if (route instanceof AuthRouteContract) {
        this.authRoutes.push(route)
        return
      }

      this.noAuthRoutes.push(route)
    })
  }

  private getAuthMiddlewares() {
    return [new AuthMiddleware().all]
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
