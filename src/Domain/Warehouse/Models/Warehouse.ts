import { randomUUID } from 'crypto'

export class Warehouse {
  constructor(
    private storeId: string,
    private name: string,
    private addressZipCode: string,
    private addressState: string,
    private addressCity: string,
    private addressDistrict: string,
    private addressStreet: string,
    private addressNumber: string,
    private addressComplement: string,
    private priority: number,
    private id?: string,
    private createdAt?: Date,
    private updatedAt?: Date
  ) {
    if (!id) this.id = randomUUID()
  }

  public getAddressComplement(): string {
    return this.addressComplement
  }

  public setAddressComplement(addressComplement: string) {
    this.addressComplement = addressComplement
    return this
  }

  public getAddressNumber(): string {
    return this.addressNumber
  }

  public setAddressNumber(addressNumber: string) {
    this.addressNumber = addressNumber
    return this
  }

  public getAddressStreet(): string {
    return this.addressStreet
  }

  public setAddressStreet(addressStreet: string) {
    this.addressStreet = addressStreet
    return this
  }

  public getAddressDistrict(): string {
    return this.addressDistrict
  }

  public setAddressDistrict(addressDistrict: string) {
    this.addressDistrict = addressDistrict
    return this
  }

  public getAddressCity(): string {
    return this.addressCity
  }

  public setAddressCity(addressCity: string) {
    this.addressCity = addressCity
    return this
  }

  public getAddressState(): string {
    return this.addressState
  }

  public setAddressState(addressState: string) {
    this.addressState = addressState
    return this
  }

  public getAddressZipCode(): string {
    return this.addressZipCode
  }

  public setAddressZipCode(addressZipCode: string) {
    this.addressZipCode = addressZipCode
    return this
  }

  public getName(): string {
    return this.name
  }

  public setName(name: string) {
    this.name = name
    return this
  }

  public getStoreId(): string {
    return this.storeId
  }

  public getPriority(): number {
    return this.priority
  }

  public setPriority(priority: number): void {
    this.priority = priority
  }

  public getId(): string {
    return this.id
  }

  public getCreatedAt(): Date {
    return this.createdAt
  }

  public getUpdatedAt(): Date {
    return this.updatedAt
  }
}
