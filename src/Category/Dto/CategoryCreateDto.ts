export interface CategoryCreateDto {
  label: string
  urn: string
  description: string
  parent: {
    id: string
  }
}
