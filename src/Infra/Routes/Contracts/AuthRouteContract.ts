import { BaseController } from 'ecommsystem-core'

import { RouteContract } from './RouteContract'

export abstract class AuthRouteContract<
  T extends BaseController
> extends RouteContract<T> {}
