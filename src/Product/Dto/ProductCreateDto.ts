export interface ProductCreateDto {
  title: string
  description: string
  category: {
    id: string
  }
  id: string
}
