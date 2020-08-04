import {Model, DataTypes} from "sequelize";
import sequelize from './index';
import bcrypt from 'bcrypt';
import Task from './task';

export interface UserI{
    id?: DataTypes.DataTypeAbstract
    name: string
    email: string
    password: string
}

class UserModel extends Model<UserI> implements UserI{
    public id?: DataTypes.DataTypeAbstract
    public name!: string;
    public email!: string;
    public password!: string;
    public readonly createdAt!: Date;
}
UserModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: "user",
        sequelize
    }
)

UserModel.beforeCreate((user, opts) => {
    return hashPassword(user.password)
        .then((hash: any) => {
            user.password = hash
        })
        .catch(err => console.log(err))
})


function hashPassword(password: string) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt((err, salt) => {
            if(err){
                return reject(err)
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if(err){
                    return reject(err)
                }
                return resolve(hash) 
            })
        })
    })
}

export async function comparePass(user: UserModel, password: string, cb: any)
{   
    const u = user.get()
    return await bcrypt.compare(password, u.password)
}

export default UserModel;
