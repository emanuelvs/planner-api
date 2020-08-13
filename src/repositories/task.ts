import taskModel, { TaskI } from '../models/task';



const findById = async (id: string) => {
    try {
        const task = await taskModel.findByPk(id);
        return task?.get();
    }catch(err) {
        throw err;
    }
}

const findAll = async (authorId: string) => {
    try {
        const tasks = await taskModel.findAll({where: {author_id: authorId}});
        return tasks;
    } catch (error) {
        throw error;
    }
}

const create = async (data: TaskI) => {
    try {
        taskModel.sync()
        await taskModel.create(data);
    }catch(err){
        throw err;
    }
}

const remove = async (id: string) => {
    try {
        await taskModel.destroy({where: {id: id}})
    }catch(err) {
        throw err
    }
}

const update = async (id: string, dto: any) => {
    try {
        const task = await taskModel.findByPk(id)
        task?.update({dto});
    } catch(err) {
        throw err;
    }
}


export default {
    create,
    findAll,
    findById,
    remove,
    update
}