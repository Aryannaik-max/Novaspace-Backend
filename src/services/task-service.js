const CrudService = require('./crud-service');
const TaskRepository = require('../repositories/task-repo');
const {user} = require('../models/index');

class TaskService extends CrudService {
    constructor() {
        super(TaskRepository);
    }

    async fetchWithCreator (workspaceId) {
        try {
            const tasks = await this.repository.fetchWithCreator({ 
                workspaceId: Number(workspaceId) 
            }, [
                {
                    model: user,
                    as: 'creator',
                    attributes: ['id', 'name', 'email']
                }
            ]);
            return tasks;
        } catch (error) {
            console.error('Error in fetchWithCreator:', error);
            throw error;
        }
    }
}

module.exports = TaskService;