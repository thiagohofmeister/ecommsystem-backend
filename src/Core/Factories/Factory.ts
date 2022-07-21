import { MySQL } from '../../Infra/Database/MySQL'
import { Redis } from '../../Infra/Database/Redis'
import { DataMapperFactory } from './DataMapperFactory'
import { FacadeFactory } from './FacadeFactory'
import { ProviderFactory } from './ProviderFactory'
import { QueueFactory } from './QueueFactory,'
import { RepositoryFactory } from './RepositoryFactory'
import { ServiceFactory } from './ServiceFactory'

export class Factory {
  private static instance: Factory

  private repositoryFactory: RepositoryFactory

  private constructor() {}

  public buildFacadeFactory() {
    return new FacadeFactory(
      this.buildRepositoryFactory(),
      this.buildProviderFactory(),
      this.buildQueueFactory()
    )
  }

  public buildProviderFactory() {
    return new ProviderFactory()
  }

  public buildRepositoryFactory() {
    if (!this.repositoryFactory) {
      this.repositoryFactory = new RepositoryFactory(
        this.buildDataMapperFactory(),
        MySQL.getDataSource(),
        Redis.getClient()
      )
    }

    return this.repositoryFactory
  }

  public buildServiceFactory() {
    return new ServiceFactory(this.buildRepositoryFactory())
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
