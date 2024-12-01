import * as controller from '../controllers/users.controller'
import { Router } from 'express'

const usersRouter = Router()

usersRouter.get('/users', controller.getAllUsers)

usersRouter.get('/profile', controller.userProfile)

usersRouter.post('/:user', controller.updateUserRole)

usersRouter.post('/sign/up', controller.signUp)

usersRouter.post('/sign/in', controller.signIn)

usersRouter.delete('/logout', controller.logOut)

export default usersRouter
