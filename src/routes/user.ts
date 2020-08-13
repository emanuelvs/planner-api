import { Router } from 'express'
import {UserI} from '../models/user'
import { auth } from '../middlewares/auth'
import userService from '../repositories/user'
import { verifyJWT } from '../middlewares/auth'

const userRouter = Router()

userRouter.post('/signup',
async (req, res, next) => {
    const user:UserI = req.body;
    try {
        const dto = await userService.create(user)
        return res.json(dto)
    } catch (error) {
        res.status(401)
        return next(error)
    }
})

userRouter.get('/login', verifyJWT,auth,
(req: any, res) => {
    res.json({authenticated: true, raw_token: req.raw_token})
})

userRouter.get('/logout',
(req, res) => {
    res.json({message: "You are left"})
})

export default userRouter
