export interface CategoryUpdateDto {
  label: string
  urn: string
  description: string
  parent: {
    id: string
  }
}
