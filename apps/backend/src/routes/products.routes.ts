import * as controller from '../controllers/products.controller'
import { Router } from 'express'
import { middlewareAdmin, middlewareUser } from '../middlewares/auth.mw'

const productsRouter = Router()

productsRouter.get('/', middlewareUser, controller.getAllProducts)

productsRouter.post('/', middlewareAdmin, controller.createProduct)

productsRouter.get('/:product', middlewareUser, controller.getProduct)

productsRouter.post('/:product', middlewareAdmin, controller.updateProduct)

productsRouter.delete('/:product', middlewareAdmin, controller.deleteProduct)

export default productsRouter
