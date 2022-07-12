import { FacadeFactory } from '../Factories/FacadeFactory'

export class Consumer {
  constructor(private readonly facadeFactory: FacadeFactory) {}
}
