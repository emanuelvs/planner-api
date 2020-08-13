import { Router } from 'express';
import taskService from '../repositories/task';
import { v4 as UUIDV4 } from 'uuid';
const taskRouter = Router()


taskRouter.route('/')
.get(async(req:any, res, next) => {
    const userId = req.user
    try {
        const tasks = await taskService.findAll(userId)
        res.json(tasks)
    } catch (error) {
        next(error)
    }
})
.post(async(req: any, res, next) => {
    const userId = req.user;
    try {
        const id = UUIDV4();
        const data = req.body;
        data.id = id;
        data.author_id = userId;
        await taskService.create(data);
        res.json({success: true})
    } catch (error) {
        next(error)
    }
})
.delete((req, res) => {
    res.status(405).json({code: 405, message: "Method unsupported"})
})
.put((req, res) => {
    res.status(405).json({code: 405, message: "Method unsupported"})
})

taskRouter.route('/:taskId')
.get(async(req, res) => {
    const taskId = req.params.taskId;
    const task = await taskService.findById(taskId);
    res.json(task)
})
.delete(async(req, res, next) => {
    const taskId = req.params.taskId;
    try {
        await taskService.remove(taskId);
        res.status(200).json({success: true})
    }catch(err){res.status(404).json({err: err, success: false})}
})
.put(async(req, res) => {
    try {
        const taskId = req.params.taskId;
        const dto = req.body;
        await taskService.update(taskId, dto)
        res.json({success: true, error: null});
    }catch(err) {
        res.status(500).json({success: false, error: err})
    }
})

export default taskRouter;
