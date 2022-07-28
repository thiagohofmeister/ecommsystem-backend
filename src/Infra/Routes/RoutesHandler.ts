import { Router } from 'express'
import { CreateContext } from '../../Core/Middlewares/CreateContext'
import { BrandController } from '../../Domain/Brand/BrandController'
import { CategoryController } from '../../Domain/Category/CategoryController'
import { ProductController } from '../../Domain/Product/ProductController'
import { AuthRouteContract } from './Contracts/AuthRouteContract'
import { RouteContract } from './Contracts/RouteContract'
import { BrandRoutes } from './WithAuth/BrandRoutes'
import { CategoryRoutes } from './WithAuth/CategoryRoutes'
import { ProductRoutes } from './WithAuth/ProductRoutes'

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
    const routes = [
      new CategoryRoutes(new CategoryController()),
      new ProductRoutes(new ProductController()),
      new BrandRoutes(new BrandController())
    ]

    routes.forEach(route => {
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
