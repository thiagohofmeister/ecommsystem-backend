import { SuccessContract } from './SuccessContract'

export class AcceptResponse<TBody> extends SuccessContract<TBody> {
  getStatus(): number {
    return 201
  }
}
