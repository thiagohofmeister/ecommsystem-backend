import { Router } from 'express'
import { ProductController } from './Product/Controllers/ProductController'

const router = Router()

const productController = new ProductController()

router.post('/product', productController.create.bind(productController))

export { router }
