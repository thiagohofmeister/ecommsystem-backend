import { QueueFactory } from '../../Factories/QueueFactory,'
import { RepositoryFactory } from '../../Factories/RepositoryFactory'
import { CronTimeEnum } from './Enum/CronTimeEnum'
import { RoutineContract } from './Routines/Contracts/RoutineContract'

export class CronDispatcher {
  constructor(
    private readonly repositoryFactory: RepositoryFactory,
    private readonly queueFactory: QueueFactory
  ) {}

  public async dispatch(cronTime: CronTimeEnum) {
    switch (cronTime) {
      case CronTimeEnum.ONE_MINUTE:
        this.run(this.oneMinute())
        break
    }
  }

  private run(routines: RoutineContract[]) {
    routines.forEach(routine => routine.run())
  }

  private oneMinute() {
    return []
  }
}
