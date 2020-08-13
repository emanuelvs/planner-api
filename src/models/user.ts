import {Model, DataTypes} from "sequelize";
import sequelize from '../config/index';
import bcrypt from 'bcrypt';
import taskModel from './task'

export interface UserI{
    id?: DataTypes.DataTypeAbstract | string;
    name: string
    email: string
    password: string
    createdAt: Date
    updatedAt: Date
}

class UserModel extends Model<UserI> implements UserI{
    public id?: DataTypes.DataTypeAbstract | string
    public name!: string;
    public email!: string;
    public password!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
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
        },
        createdAt: {
            field: 'created_at',
            type: DataTypes.DATE
        },
        updatedAt: {
            field: 'updated_at',
            type: DataTypes.DATE
        }
    },
    {
        tableName: "users",
        sequelize
    }
)
UserModel.hasMany(taskModel);
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

export default UserModel;
