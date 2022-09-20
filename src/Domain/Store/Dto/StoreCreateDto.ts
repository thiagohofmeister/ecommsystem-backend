import { DocumentTypeEnum } from '../Enums/DocumentTypeEnum'

export interface StoreCreateDto {
  name: string
  document: {
    type: DocumentTypeEnum
    number: string
    name: string
  }
  email: string
  phone: string
}
