import jwt from 'jsonwebtoken';

export function getToken(id: string) {
    return jwt.sign({id}, process.env.SECRET!, {
        expiresIn: 3600
    })
}