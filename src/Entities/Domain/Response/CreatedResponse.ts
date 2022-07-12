import { SuccessContract } from './SuccessContract'

export class CreatedResponse<TBody> extends SuccessContract<TBody> {
  getStatus(): number {
    return 201
  }
}
