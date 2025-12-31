const CrudService = require('./crud-service');
const TaskRepository = require('../repositories/task-repo');

class TaskService extends CrudService {
    constructor() {
        super(TaskRepository);
    }
}

module.exports = TaskService;