import { randomUUID } from 'crypto'

import { User } from '../../User/Models/User'
import { DocumentTypeEnum } from '../Enums/DocumentTypeEnum'

export class Store {
  private customers: User[] = []

  constructor(
    private name: string,
    private documentType: DocumentTypeEnum,
    private documentNumber: string,
    private documentName: string,
    private email: string,
    private phone: string,
    private owner?: User,
    private id?: string
  ) {
    if (!id) this.id = randomUUID()
  }

  public getOwner(): User {
    return this.owner
  }

  public setOwner(owner: User) {
    this.owner = owner
    return this
  }

  public getPhone(): string {
    return this.phone
  }

  public setPhone(phone: string) {
    this.phone = phone
    return this
  }

  public getEmail(): string {
    return this.email
  }

  public setEmail(email: string) {
    this.email = email
    return this
  }

  public getDocumentName(): string {
    return this.documentName
  }

  public setDocumentName(documentName: string) {
    this.documentName = documentName
    return this
  }

  public getDocumentNumber(): string {
    return this.documentNumber
  }

  public setDocumentNumber(documentNumber: string) {
    this.documentNumber = documentNumber
    return this
  }

  public getDocumentType(): DocumentTypeEnum {
    return this.documentType
  }

  public setDocumentType(documentType: DocumentTypeEnum) {
    this.documentType = documentType
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

  public removeCustomers(keepCustomerIds: string[]) {
    if (!this.customers) this.customers = []

    this.customers = this.customers.filter(
      customer => !keepCustomerIds.includes(customer.getId())
    )

    return this.customers
  }

  public addCustomer(customer: User) {
    if (!this.customers) this.customers = []
    this.customers.push(customer)
    return this
  }

  public getCustomers(): User[] {
    return this.customers
  }
}
