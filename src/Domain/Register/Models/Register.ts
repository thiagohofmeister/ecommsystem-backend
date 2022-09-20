import { Store } from '../../Store/Models/Store'
import { User } from '../../User/Models/User'

export class Register {
  constructor(private user: User, private store: Store) {}

  public getUser() {
    return this.user
  }

  public getStore() {
    return this.store
  }
}
