import { Schema, model } from 'mongoose'

const productModel = new Schema(
  {
    name: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    description: String,
    count: { type: Number, required: true },
    date: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
)

export default model('Product', productModel)
