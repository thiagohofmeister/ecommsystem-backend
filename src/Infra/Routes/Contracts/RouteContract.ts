import { BaseController } from '../../../Core/Controllers/BaseController'
import { RouteDto } from '../../Dto/RouteDto'

export abstract class RouteContract<T extends BaseController> {
  constructor(
    protected readonly basePath: string,
    protected readonly controller: T
  ) {}

  protected getController() {
    return this.controller
  }

  protected getFullEndpoint(route: string = '') {
    return `/${[this.basePath, route]
      .filter(r => !!r.trim())
      .join('/')}`.replace(/\/\//, '/')
  }

  abstract getRoutes(): RouteDto[]
}
