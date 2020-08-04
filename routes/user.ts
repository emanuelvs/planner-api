import { Router } from 'express'
import User, {UserI} from '../models/user'
import { auth } from '../middlewares/auth'
import UserModel from '../models/user'

const userRouter = Router()

userRouter.post('/signup',
(req, res, next) => {
    const user:UserI = req.body;
    User.findOne({where: {email: user.email}})
    .then(u => {
        if (u) return res.json({message: "This user is already registered"})
        else {
            User.create(user)
            .then(usr => res.json(usr))
            .catch(err => next(err))
        }
    }).catch(err => next(err))
    //res.json(user)
})

userRouter.get('/login',auth,
(req: any, res) => {
    res.json(req.auth)
})

userRouter.get('/logout',
(req, res) => {
    res.json({message: "You are left"})
})

export default userRouter
