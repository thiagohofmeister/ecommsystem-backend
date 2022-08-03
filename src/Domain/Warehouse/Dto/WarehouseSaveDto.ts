export interface WarehouseSaveDto {
  name?: string
  priority?: number
  address?: {
    zipCode: string
    state: string
    city: string
    district: string
    street: string
    number: string
    complement: string
  }
}
