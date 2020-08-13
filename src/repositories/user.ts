import User, { UserI } from '../models/user';
import json from 'jsonwebtoken';
import config from '../config';
import {v4 as UUIDV4} from 'uuid';
import { getToken } from '../utils/jwt';
import bcrypt from 'bcrypt'
import { userInfo } from 'os';

export default class UserService {
    public static async create(dto: UserI) {
        try {
            await this.verifyEmail
            const id = UUIDV4();
            dto.id = id;
            await User.create(dto)
            return await this.findById(id);
        } catch (error) {
            throw error
        }
        
    }
    public static async findById(id: string) {
        try {
            var dto = await User.findByPk(id)
            if (dto) {
                let user = Object.assign({}, dto.get())
                delete user.password
                return user
            }
            return dto
        }catch(err) {
            throw err
        }
    }
    public static async verifyEmail(email: string) {
        try {
            if (!email.includes('@')) {
                throw new Error("Email is not valid")
            }
            let user = await User.findOne({where: {email: email}})
            if (user?.get()) {
                throw new Error("Email already is registered")
            }
        } catch (error) {
            throw error
        }
    }
    public static async authenticate({email,password}: {email: string, password: string}) {
        try {
            const dto = await User.findOne({where: {email: email}})
            if (!dto) {
                throw new Error("User not exist");
            }
            const user = dto.get()
            const isSame = await bcrypt.compare(password, user.password)
            if(!isSame) {
                throw new Error("Credentials is incorrect");
            }
            return getToken(user.id as string);
        }catch(error) {
            throw error
        }
    }
}



