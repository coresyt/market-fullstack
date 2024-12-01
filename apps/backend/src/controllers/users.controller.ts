import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import type { Request, Response } from 'express'
import env from '../env'

type Router = (req: Request, res: Response) => void

export const userProfile: Router = async (req, res) => {
  try {
    if (!req.headers.authorization)
      return res.status(401).json({ message: 'You is not really logged in' })
    const decodedToken = jwt.decode(req.headers.authorization, { json: true })

    if (!decodedToken) return res.status(401).json()
    const userFind = await User.findOne({ email: decodedToken.email })

    if (!userFind) return res.status(401).json()
    const isPassword = await userFind.comparePassword(decodedToken.password)

    if (isPassword !== true) return res.status(401).json()
    const user = {
      username: userFind.username,
      email: userFind.email,
      role: userFind.role === 'user' ? '' : 'admin',
    }

    return res.status(201).json({
      message: 'User is found successfully',
      user,
    })
  } catch (err) {
    console.log(err)
    return res.status(400).json()
  }
}

export const getAllUsers: Router = async (req, res) => {
  try {
    if (!req.headers.authorization)
      return res.status(401).json({ message: 'You is not really logged in' })
    const decodedToken = jwt.decode(req.headers.authorization, { json: true })

    if (!decodedToken)
      return res.status(401).json({ message: 'Your token is invalid' })
    const userFind = await User.findOne({ email: decodedToken.email })

    if (!userFind)
      return res.status(401).json({ message: 'Your user is not found' })
    const isPassword = await userFind.comparePassword(decodedToken.password)

    if (isPassword !== true)
      return res.status(401).json({ message: 'Your password is incorrect' })
    const isAdmin = await userFind.isAdmin()

    if (isAdmin !== true)
      return res.status(401).json({ message: "It's just for admin's" })
    const users = (await User.find()).map(({ username, email, role, id }) => ({
      email,
      username,
      role,
      id,
    }))

    return res.status(201).json({
      message: 'Users is founds successfully',
      users,
    })
  } catch (err) {
    console.log(err)
    return res.status(400).json()
  }
}

export const updateUserRole: Router = async (req, res) => {
  try {
    if (!req.headers.authorization)
      return res.status(401).json({ message: 'You is not really logged in' })
    const decodedToken = jwt.decode(req.headers.authorization, { json: true })

    if (!decodedToken) return res.status(401).json()
    const userFind = await User.findOne({ email: decodedToken.email })

    if (!userFind) return res.status(401).json()
    const isPassword = await userFind.comparePassword(decodedToken.password)

    if (isPassword !== true) return res.status(401).json()
    const isAdmin = await userFind.isAdmin()

    if (isAdmin !== true)
      return res.status(401).json({ message: "It's just for admin's" })

    const userFound = await User.findById(req.params.user)
    await userFound?.updateOne({
      role: (await userFound.isAdmin()) !== true ? 'admin' : 'user',
    })

    return res.status(201).json({
      message: 'User is updated successfully',
    })
  } catch (err) {
    console.log(err)
    return res.status(400).json()
  }
}

export const signUp: Router = async (req, res) => {
  try {
    if (req.headers.authorization)
      return res.status(401).json({ message: 'You is really logged in' })

    if (
      typeof req.body !== 'object' ||
      typeof req.body.username !== 'string' ||
      typeof req.body.password !== 'string' ||
      typeof req.body.email !== 'string' ||
      req.body.role
    )
      return res.status(400).json({
        status: 400,
        message:
          'Is bad request because not exist "username", "password", or "email"',
      })
    const { password, ...body } = req.body

    const newUser = new User({
      password: await User.encryptPassword(password),
      ...body,
    })
    await newUser.save()

    const token = jwt.sign(
      { email: req.body.email, password: req.body.password },
      env.SECRET_KEY,
    )

    return res.status(201).json({
      message: 'User created successfully',
      token,
    })
  } catch (err) {
    console.log(err)
    return res.status(400).json()
  }
}

export const signIn: Router = async (req, res) => {
  try {
    if (req.headers.authorization && req.headers.authorization.length >= 1)
      return res.status(401).json({ message: 'You is not really logged in' })

    const userFind = await User.findOne({ email: req.body.email })

    if (!userFind) return res.status(401).json()
    const isPassword = await userFind.comparePassword(req.body.password)

    if (isPassword !== true) return res.status(401).json()
    const token = jwt.sign(
      { email: req.body.email, password: req.body.password },
      env.SECRET_KEY,
    )

    return res.status(201).json({
      message: 'User logged in successfully',
      token,
    })
  } catch (err) {
    console.log(err)
    return res.status(400).json()
  }
}

export const logOut: Router = async (req, res) => {
  try {
    if (!req.headers.authorization)
      return res.status(401).json({ message: 'You is not really logged in' })
    const decodedToken = jwt.decode(req.headers.authorization, { json: true })

    if (!decodedToken) return res.status(401).json()
    const userFind = await User.findOne({ email: decodedToken.email })

    if (!userFind) return res.status(401).json()
    const isPassword = await userFind.comparePassword(req.body.password)

    if (isPassword !== true) return res.status(401).json()
    await userFind.deleteOne()

    return res.status(201).setHeader('authorization', '').json({
      message: 'User deleted successfully',
    })
  } catch (err) {
    console.log(err)
    return res.status(400).json()
  }
}
