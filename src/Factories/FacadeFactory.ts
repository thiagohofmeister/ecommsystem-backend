import { ProviderFactory } from './ProviderFactory'
import { QueueFactory } from './QueueFactory,'
import { RepositoryFactory } from './RepositoryFactory'

export class FacadeFactory {
  constructor(
    private readonly repositoryFactory: RepositoryFactory,
    private readonly providerFactory: ProviderFactory,
    private readonly queueFactory: QueueFactory
  ) {}
}
