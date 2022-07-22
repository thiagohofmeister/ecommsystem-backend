import * as sinon from 'sinon'

import { BrandRepositoryImpl } from '../../../src/Infra/Repositories/BrandRepositoryImpl'
import { CategoryRepositoryImpl } from '../../../src/Infra/Repositories/CategoryRepositoryImpl'
import { ProductRepositoryImpl } from '../../../src/Infra/Repositories/ProductRepositoryImpl'
import { VariationRepositoryImpl } from '../../../src/Infra/Repositories/VariationRepository'
import { ProductCreateDto } from '../../../src/Product/Dto/ProductCreateDto'
import { Product } from '../../../src/Product/Models/Product'
import { ProductDeleteVariationService } from '../../../src/Product/Services/ProductDeleteVariationService'
import { ProductSaveService } from '../../../src/Product/Services/ProductSaveService'
import { ProductSaveVariationService } from '../../../src/Product/Services/ProductSaveVariationService'

describe('Create a product', () => {
  const storeId = 'store-id'

  let defaultProduct: Product
  let categoryRepositoryStub
  let brandRepositoryStub
  let productRepositoryStub
  let variationRepositoryStub
  let sandbox: sinon.SinonSandbox

  beforeEach(() => {
    sandbox = sinon.createSandbox()

    defaultProduct = new Product(
      'store-id',
      'title',
      'description',
      true,
      'product-id'
    )

    categoryRepositoryStub = sandbox.createStubInstance(BrandRepositoryImpl)
    brandRepositoryStub = sandbox.createStubInstance(CategoryRepositoryImpl)
    productRepositoryStub = sandbox.createStubInstance(ProductRepositoryImpl, {
      findOneById: (async (id: string) => defaultProduct)('product-id'),
      save: (async (product: Product) => product)(defaultProduct)
    })
    variationRepositoryStub = sandbox.createStubInstance(
      VariationRepositoryImpl
    )
  })

  test('should create a product', async () => {
    const payload: ProductCreateDto = {
      title: 'Product title',
      description: 'Product description',
      category: {
        id: 'category-id'
      },
      brand: {
        id: 'brand-id'
      },
      id: 'product-id',
      variations: []
    }

    const expected = new Product(
      'store-id',
      'title',
      'description',
      true,
      'product-id'
    )

    const productSaveService = new ProductSaveService(
      categoryRepositoryStub,
      brandRepositoryStub,
      productRepositoryStub,
      new ProductSaveVariationService(variationRepositoryStub),
      new ProductDeleteVariationService(variationRepositoryStub)
    )

    const product = await productSaveService.execute(storeId, payload)

    expect(product).toEqual(expected)
  })
})
