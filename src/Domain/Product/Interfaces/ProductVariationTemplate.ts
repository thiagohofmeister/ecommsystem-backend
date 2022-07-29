export interface ProductVariationTemplate {
  images: string
  groups: string
  attributes: {
    id: string
    label?: string
  }[]
}
