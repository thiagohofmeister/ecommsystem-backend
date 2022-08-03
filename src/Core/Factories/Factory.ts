import { MySQL } from '../../Infra/Database/MySQL'
import { Redis } from '../../Infra/Database/Redis'
import { DataMapperFactory } from './DataMapperFactory'
import { FacadeFactory } from './FacadeFactory'
import { ProviderFactory } from './ProviderFactory'
import { QueueFactory } from './QueueFactory'
import { RepositoryFactory } from './RepositoryFactory'
import { ServiceFactory } from './ServiceFactory'

export class Factory {
  private static instance: Factory

  private constructor() {}

  public buildFacadeFactory(storeId: string) {
    return new FacadeFactory(this.buildServiceFactory(storeId))
  }

  public buildProviderFactory() {
    return new ProviderFactory()
  }

  public buildRepositoryFactory(storeId: string) {
    return new RepositoryFactory(
      this.buildDataMapperFactory(),
      MySQL.getDataSource(),
      Redis.getClient(),
      storeId
    )
  }

  public buildServiceFactory(storeId: string) {
    return new ServiceFactory(
      this.buildRepositoryFactory(storeId),
      this.buildQueueFactory()
    )
  }

  public buildDataMapperFactory() {
    return new DataMapperFactory()
  }

  public buildQueueFactory() {
    return new QueueFactory(process.env.QUEUE_URL)
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new Factory()
    }

    return this.instance
  }
}
