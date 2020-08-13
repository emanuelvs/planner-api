import { Request, Response, NextFunction } from "express"
import userService from '../repositories/user';
import jwt from 'jsonwebtoken'

export type auth = {
    isAuth: boolean, 
    token: string
}

export async function auth(req: any, res: any, next: NextFunction) {
    if(req.user){
        return res.status(200).json({authenticated: true})
    }
    try {
        const user = await parseCredentials(req);
        const token = await userService.authenticate(user);
        req.raw_token = token;
        return next()
    } catch (error) {
        res.status(401);
        return next(error)
    }
}

export function verifyJWT(req: any, res: any, next: any) {
    const token = req.headers.authorization?.split(' ')[1]

    if(!token) {
        res.status(401); 
        return next(new Error("Not authorized"))
    }
    
    jwt.verify(token, process.env.SECRET!, (err: any, payload: any) => {
        if(err) return next(err);
        req.user = payload.id;
        next()
    })
}

function parseCredentials(req: Request) {
    return new Promise<{email: string, password: string}>((resolve, reject) => {
    const authHeader = req.headers.authorization?.split(' ')[1]
    let err = null
    if (authHeader) {
        
        const credentials =  new Buffer(authHeader, 'base64').toString().split(':')
        
        if (!(credentials[0].includes('@') && credentials[1].length < 6)){
            err = new Error("Malformed credentials")
            return reject(err)
        }
        return resolve({email: credentials[0], password: credentials[1]})
    }
    else {
        err = new Error("Authorization header is missing")
        return reject(err)
    }
    })
}