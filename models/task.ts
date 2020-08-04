import {Model, DataTypes} from 'sequelize'
import sequelize from './index'
import UserModel from './user'

export interface TaskI {
    id?: DataTypes.DataTypeAbstract
    author_id?: DataTypes.DataTypeAbstract
    title: string
    description: string
    notify: boolean
    left_time?: Date
}

class TaskModel extends Model<TaskI> implements TaskI {
    public id?: DataTypes.AbstractDataTypeConstructor | undefined
    public author_id?: DataTypes.AbstractDataTypeConstructor
    public title!: string
    public description!: string
    public notify!: boolean
    public left_time?: Date
    public readonly createdAt!: Date;
}
TaskModel.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    author_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    notify: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    left_time: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'task',
    sequelize
})
// TaskModel.hasOne(UserModel, {
//     foreignKey: 'author_id'
// })

export default TaskModel;