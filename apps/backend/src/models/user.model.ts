import bcrypt from 'bcrypt'
import { Schema, model } from 'mongoose'

const userModel = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  {
    timestamps: true,
    versionKey: false,
    statics: {
      encryptPassword: async (password: string) => {
        const salt = await bcrypt.genSalt()
        return await bcrypt.hash(password, salt)
      },
    },
    methods: {
      isAdmin: async function () {
        return this.role === 'admin' ? true : false
      },
      comparePassword: async function (password: string) {
        return await bcrypt.compare(password, this.password)
      },
    },
  },
)

export default model('User', userModel)
