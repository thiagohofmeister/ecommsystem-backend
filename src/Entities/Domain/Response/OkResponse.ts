import { SuccessContract } from './SuccessContract'

export class OkResponse<TBody> extends SuccessContract<TBody> {
  getStatus(): number {
    return 200
  }
}
