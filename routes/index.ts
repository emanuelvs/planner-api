import { Router } from 'express'
import userRouter from './user'
import { verifyJWT } from '../middlewares/auth'

const routes = Router()
routes.get('/', verifyJWT, (req: any, res) => { res.json({success: true, id: req.user}) })
routes.use('/user', userRouter)

export default routes