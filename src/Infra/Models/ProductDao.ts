import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn
} from 'typeorm'
import { ProductVariationTemplate } from '../../Domain/Product/Interfaces/ProductVariationTemplate'

import { BrandDao } from './BrandDao'
import { CategoryDao } from './CategoryDao'
import { ImageDao } from './ImageDao'
import { VariationDao } from './VariationDao'

@Entity('product')
export class ProductDao {
  @PrimaryColumn()
  id: string

  @Column({
    name: 'store_id',
    update: false
  })
  storeId: string

  @Column()
  title: string

  @Column()
  description: string

  @Column({
    name: 'variation_template',
    type: 'json'
  })
  variationTemplate: ProductVariationTemplate

  @Column()
  active: boolean

  @ManyToOne(() => CategoryDao, category => category.products)
  @JoinColumn({
    name: 'category_id'
  })
  category?: CategoryDao

  @ManyToOne(() => BrandDao, brand => brand.products)
  @JoinColumn({
    name: 'brand_id'
  })
  brand?: BrandDao

  @OneToMany(() => VariationDao, variation => variation.product, {
    eager: true
  })
  @JoinColumn([
    {
      name: 'product_id'
    },
    {
      name: 'store_id'
    }
  ])
  variations?: VariationDao[]

  @OneToMany(() => ImageDao, image => image.product, {
    cascade: true
  })
  @JoinColumn([
    {
      name: 'product_id'
    },
    {
      name: 'store_id'
    }
  ])
  images?: ImageDao[]

  @Column({
    name: 'created_at'
  })
  createdAt: Date

  @Column({
    name: 'updated_at'
  })
  updatedAt: Date

  constructor(
    id: string,
    storeId: string,
    title: string,
    description: string,
    variationTemplate: ProductVariationTemplate,
    active: boolean,
    createdAt: Date
  ) {
    this.id = id
    this.storeId = storeId
    this.title = title
    this.description = description
    this.variationTemplate = variationTemplate
    this.active = active
    this.createdAt = createdAt
  }
}
