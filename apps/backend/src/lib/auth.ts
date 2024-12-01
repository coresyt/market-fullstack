import User from '../models/user.model'
import jwt from 'jsonwebtoken'

export async function authAdmin(
  token: string,
): Promise<{ message?: string; success: boolean }> {
  if (!token || typeof token !== 'string')
    return { message: 'Invalid token', success: false }
  const decodedToken = jwt.decode(token, { json: true })

  if (!decodedToken) return { message: 'Your token is invalid', success: false }
  const userFind = await User.findOne({ email: decodedToken.email })

  if (!userFind) return { message: 'Your user is not found', success: false }
  const isPassword = await userFind.comparePassword(decodedToken.password)

  if (isPassword !== true)
    return { message: 'Your password is incorrect', success: false }
  const isAdmin = await userFind.isAdmin()

  if (isAdmin !== true)
    return { message: "It's just for admin's", success: false }

  return { success: true }
}

export async function authUser(
  token: string,
): Promise<{ message?: string; success: boolean }> {
  if (!token || typeof token !== 'string')
    return { message: 'Invalid token', success: false }
  const decodedToken = jwt.decode(token, { json: true })

  if (!decodedToken) return { message: 'Your token is invalid', success: false }
  const userFind = await User.findOne({ email: decodedToken.email })

  if (!userFind) return { message: 'Your user is not found', success: false }
  const isPassword = await userFind.comparePassword(decodedToken.password)

  if (isPassword !== true)
    return { message: 'Your password is incorrect', success: false }

  return { success: true }
}
