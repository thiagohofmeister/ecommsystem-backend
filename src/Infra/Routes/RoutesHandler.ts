import { Router } from 'express'
import { SimpleConsoleLogger } from 'typeorm'
import { AuthRouteContract } from './Contracts/AuthRouteContract'
import { RouteContract } from './Contracts/RouteContract'
import { ProductRoutes } from './WithAuth/ProductRoutes'

export class RoutesHandler {
  constructor() {
    this.getRoutes = this.getRoutes.bind(this)
    this.getAuthMiddlewares = this.getAuthMiddlewares.bind(this)
    this.getDefaultMiddlewares = this.getDefaultMiddlewares.bind(this)
    this.getRouter = this.getRouter.bind(this)
  }

  private getRoutes() {
    return [new ProductRoutes()]
  }

  private getAuthMiddlewares() {
    return []
  }

  private getDefaultMiddlewares() {
    return []
  }

  public getRouter() {
    const router = Router()

    this.getDefaultMiddlewares().forEach(middleware => router.use(middleware))

    const noAuthRoutes = this.getNoAuthRoutes()

    for (let i = 0; i < noAuthRoutes.length; i++) {
      const route = noAuthRoutes[i]
      const routes = route.getRoutes()

      for (let j = 0; j < routes.length; j++) {
        const { method, handle, path } = routes[j]
        router[method](path, handle)
      }
    }

    this.getAuthMiddlewares().forEach(middleware => router.use(middleware))

    const authRoutes = this.getAuthRoutes()

    for (let i = 0; i < authRoutes.length; i++) {
      const route = authRoutes[i]
      const routes = route.getRoutes()

      for (let j = 0; j < routes.length; j++) {
        const { method, handle, path } = routes[j]
        router[method](path, handle)
      }
    }

    return router
  }

  private getNoAuthRoutes() {
    return this.getRoutes().filter(route => !!(route instanceof RouteContract))
  }

  private getAuthRoutes() {
    return this.getRoutes().filter(
      route => !!(route instanceof AuthRouteContract)
    )
  }
}
