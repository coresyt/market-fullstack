import Product from '../models/Product.model'
import type { Request, Response } from 'express'

type Router = (req: Request, res: Response) => void

export const getAllProducts: Router = async (_, res) => {
  const products = await Product.find()

  return res.json({ products })
}

export const createProduct: Router = async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.displayName ||
      !req.body.date ||
      !req.body.count ||
      !req.body.description
    )
      return res.status(400).json({
        status: 400,
        message:
          'Is bad request because not exist "name", "displayName", "date", "count", "count", or "description "',
      })

    const product = new Product(req.body)
    await product.save()
    return res
      .status(201)
      .json({ status: 201, message: 'Create product successfully' })
  } catch (err) {
    console.log(err)
    return res.status(400).json()
  }
}

export const getProduct: Router = async (req, res) => {
  try {
    const product = await Product.findById(req.params.product)

    if (!product)
      return res.status(404).json({ status: 404, message: 'Product not found' })

    return res.json(product)
  } catch (err) {
    console.log(err)
    return res.status(400).json()
  }
}

export const updateProduct: Router = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.product, req.body)
    return res.json({ status: 200, message: 'Updating product successfully' })
  } catch (err) {
    console.log(err)
    return res.status(400).json()
  }
}

export const deleteProduct: Router = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.product)
    return res.json({ status: 200, message: 'Delete product successfully' })
  } catch (err) {
    console.log(err)
    return res.status(400).json()
  }
}
