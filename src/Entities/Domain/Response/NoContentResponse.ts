import { SuccessContract } from './SuccessContract'

export class NoContentResponse<TBody> extends SuccessContract<TBody> {
  getStatus(): number {
    return 204
  }
}
