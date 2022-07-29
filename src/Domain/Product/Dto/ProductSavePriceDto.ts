export interface ProductSavePriceDto {
  sku: string
  campaign: {
    id: string
  }
  list: number
  sale: number
}
