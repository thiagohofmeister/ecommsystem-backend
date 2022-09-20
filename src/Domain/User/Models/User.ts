import { randomUUID } from 'crypto'
import { Store } from '../../Store/Models/Store'
import { UserStatusEnum } from '../Enums/UserStatusEnum'

export class User {
  private storesOwned: Store[]
  private store: Store

  constructor(
    private name: string,
    private documentNumber: string,
    private email: string,
    private password: string,
    private status: UserStatusEnum = UserStatusEnum.ACTIVE,
    private id?: string
  ) {
    if (!id) this.id = randomUUID()
  }

  public getStatus(): UserStatusEnum {
    return this.status
  }

  public setStatus(status: UserStatusEnum) {
    this.status = status
    return this
  }

  public getPassword(): string {
    return this.password
  }

  public setPassword(password: string) {
    this.password = password
    return this
  }

  public getEmail(): string {
    return this.email
  }

  public setEmail(email: string) {
    this.email = email
    return this
  }

  public getDocumentNumber(): string {
    return this.documentNumber
  }

  public setDocumentNumber(documentNumber: string) {
    this.documentNumber = documentNumber
    return this
  }

  public getName(): string {
    return this.name
  }

  public setName(name: string) {
    this.name = name
    return this
  }

  public getId(): string {
    return this.id
  }

  public removeStoresOwned(keepStoreIds: string[]) {
    if (!this.storesOwned) this.storesOwned = []

    this.storesOwned = this.storesOwned.filter(
      storeOwned => !keepStoreIds.includes(storeOwned.getId())
    )

    return this.storesOwned
  }

  public addStoreOwned(storeOwned: Store) {
    if (!this.storesOwned) this.storesOwned = []
    this.storesOwned.push(storeOwned)
    return this
  }

  public getStoresOwned(): Store[] {
    return this.storesOwned
  }

  public setStore(store: Store) {
    this.store = store
    return this
  }

  public getStore(): Store {
    return this.store
  }

  public getAllStores(): Store[] {
    return this.storesOwned
  }

  public isOwnerOfStore(storeId: string): boolean {
    if (!this.storesOwned) {
      throw new Error(`Please add storesOwned relationship.`)
    }

    return !!this.storesOwned.find(store => store.getId() === storeId)
  }
}
