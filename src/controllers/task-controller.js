const TaskService = require('../services/task-service');
const taskService = new TaskService();

const createTask = async (req, res) => {    
    try {
        const taskData = {
            name: req.body.name,  
            description: req.body.description,
            section: req.body.section,
            dueDate: req.body.dueDate,
            workspaceId: req.body.workspaceId,
            priority: req.body.priority,
            createdBy: req.user.id
        };
        const task = await taskService.create(taskData);
        return res.status(201).json({
            data: task, 
            success: true,
            message: 'Task created successfully',
            err: {}
        });
    } catch (error) {
        console.error('Error in createTask controller:', error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Failed to create task',
            err: error
        });
    }   
};

const getAllTasks = async (req, res) => {
    try {
        const tasks = await taskService.get(req.body.workspaceId);
        return res.status(200).json({
            data: tasks,
            success: true,
            message: 'Tasks fetched successfully',
            err: {}
        });
    } catch (error) {
        console.error('Error in getAllTasks controller:', error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Failed to fetch tasks',
            err: error
        });
    }
};

const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        await taskService.delete({ id: taskId });
        return res.status(200).json({
            data: {},
            success: true,
            message: 'Task deleted successfully',
            err: {}
        });
    } catch (error) {
        console.error('Error in deleteTask controller:', error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Failed to delete task',
            err: error
        });
    }
};

const updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const updateData = req.body;    
        const updatedTask = await taskService.update(updateData, taskId);
        return res.status(200).json({
            data: updatedTask,
            success: true,
            message: 'Task updated successfully',
            err: {}
        });
    } catch (error) {
        console.error('Error in updateTask controller:', error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Failed to update task',
            err: error
        });
    }
};

module.exports = {
    createTask,
    getAllTasks,
    deleteTask,
    updateTask
};