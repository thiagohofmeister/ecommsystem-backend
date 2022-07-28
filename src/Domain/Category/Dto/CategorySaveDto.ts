export interface CategorySaveDto {
  label?: string
  urn?: string
  description?: string
  parent?: {
    id: string
  }
}
