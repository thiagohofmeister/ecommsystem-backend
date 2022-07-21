export abstract class RouteContract {
  constructor(protected readonly basePath: string) {}

  protected getFullEndpoint(route: string = '') {
    return `/${[this.basePath, route]
      .filter(r => !!r.trim())
      .join('/')}`.replace(/\/\//, '/')
  }
}
