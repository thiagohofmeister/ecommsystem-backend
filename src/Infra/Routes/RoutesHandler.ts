import { Router } from 'express'
import { CreateContext } from '../../Core/Middlewares/CreateContext'
import { AuthRouteContract } from './Contracts/AuthRouteContract'
import { CategoryRoutes } from './WithAuth/CategoryRoutes'
import { ProductRoutes } from './WithAuth/ProductRoutes'

export class RoutesHandler {
  constructor() {
    this.getRoutes = this.getRoutes.bind(this)
    this.getAuthMiddlewares = this.getAuthMiddlewares.bind(this)
    this.getDefaultMiddlewares = this.getDefaultMiddlewares.bind(this)
    this.getRouter = this.getRouter.bind(this)
  }

  private getRoutes() {
    return [new CategoryRoutes(), new ProductRoutes()]
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

    const noAuthRoutes = this.getNoAuthRoutes()

    for (let i = 0; i < noAuthRoutes.length; i++) {
      const route = noAuthRoutes[i]
      const routes = route.getRoutes()

      for (let j = 0; j < routes.length; j++) {
        const route = routes[j]
        router[route.getMethod()](route.getPath(), route.getHandle())
      }
    }

    this.getAuthMiddlewares().forEach(middleware => router.use(middleware))

    const authRoutes = this.getAuthRoutes()

    for (let i = 0; i < authRoutes.length; i++) {
      const route = authRoutes[i]
      const routes = route.getRoutes()

      for (let j = 0; j < routes.length; j++) {
        const route = routes[j]
        router[route.getMethod()](route.getPath(), route.getHandle())
      }
    }

    return router
  }

  private getNoAuthRoutes() {
    return this.getRoutes().filter(
      route => !(route instanceof AuthRouteContract)
    )
  }

  private getAuthRoutes() {
    return this.getRoutes().filter(
      route => !!(route instanceof AuthRouteContract)
    )
  }
}
