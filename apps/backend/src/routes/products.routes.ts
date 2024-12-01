import * as controller from '../controllers/products.controller'
import { Router } from 'express'

const productsRouter = Router()

productsRouter.get('/', controller.getAllProducts)

productsRouter.post('/', controller.createProduct)

productsRouter.get('/:product', controller.getProduct)

productsRouter.post('/:product', controller.updateProduct)

productsRouter.delete('/:product', controller.deleteProduct)

export default productsRouter
