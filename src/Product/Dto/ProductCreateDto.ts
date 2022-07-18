export interface ProductCreateDto {
  title: string
  price: {
    list: number
    sale: number
  }
}
