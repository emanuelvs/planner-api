import {Model, DataTypes} from 'sequelize'
import sequelize from '../config/index'

export interface TaskI {
    id?: DataTypes.DataTypeAbstract | string
    author_id?: DataTypes.DataTypeAbstract | string
    title: string
    description: string
    createdAt: Date
    updatedAt: Date
}

class TaskModel extends Model<TaskI> implements TaskI {
    public id?: DataTypes.AbstractDataTypeConstructor | undefined
    public author_id?: DataTypes.AbstractDataTypeConstructor
    public title!: string
    public description!: string
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
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
    createdAt: {
        field: 'created_at',
        type: DataTypes.DATE
    },
    updatedAt: {
        field: 'updated_at',
        type: DataTypes.DATE
    }
}, {
    tableName: 'tasks',
    sequelize
})


export default TaskModel;