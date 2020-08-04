import User, { comparePass } from '../models/user';
import json from 'jsonwebtoken';
import config from '../config';

export async function findById(id: string) {
    try {
        var dto = await User.findByPk(id)
        if (dto) {
            let user = Object.assign({}, dto)
            delete user.password
            return user
        }
        return dto
    }catch(err) {
        throw err
    }
}

export async function authenticate(user: any) {
    try {
        const dto = await User.findOne({where: {email: user.email}})
        if(dto && await comparePass(dto, user.password, isAuth)) {
            return isAuth(dto.get())
        }
        return isAuth(null);
    }catch(err) {
        throw err
    }
}

function isAuth(u: any) {
    return {
        isAuth: Boolean(u),
        token: u? getToken(u.id) : ''
    }
}

function getToken(id: string) {
    return json.sign({id}, process.env.SECRET!, {
        expiresIn: 3600
    })
}
