import { authAdmin, authUser } from '../lib/auth'
import type { Request, Response, NextFunction } from 'express'

type Router = (req: Request, res: Response, next: NextFunction) => void

export const middlewareUser: Router = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.headers.authorization) return res.status(401)
    const isAuth = await authUser(req.headers.authorization)
    if (isAuth.message || isAuth.success !== true)
      return res.status(401).json({ message: isAuth.message })
    return next()
  } catch (err) {
    console.log(err)
    return res.status(401).json({ message: 'Unauthorized' })
  }
}

export const middlewareAdmin: Router = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.headers.authorization) return res.status(401)
    const isAuth = await authAdmin(req.headers.authorization)
    if (isAuth.message || isAuth.success !== true)
      return res.status(401).json({ message: isAuth.message }).end()
    return next()
  } catch (err) {
    console.log(err)
    return res.status(401).json({ message: 'Unauthorized' }).end()
  }
}
