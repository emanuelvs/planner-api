import { Router } from 'express'
import userRouter from './user'
import taskRouter from './task'
import { verifyJWT } from '../middlewares/auth'

const routes = Router()
routes.all('/', (req ,res) => {res.status(403).json({message: "Cannot perform any operation on '/' path"})})
routes.use('/task', verifyJWT, taskRouter)
routes.use('/user', userRouter)

export default routes