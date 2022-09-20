import { DataNotFoundException } from 'ecommsystem-core'

export class UserDataNotFound extends DataNotFoundException {
  constructor() {
    super('User data not found.')
  }
}
