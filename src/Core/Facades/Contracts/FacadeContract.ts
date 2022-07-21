import { ServiceFactory } from '../../Factories/ServiceFactory'

export abstract class FacadeContract {
  constructor(protected readonly serviceFactory: ServiceFactory) {}
}
