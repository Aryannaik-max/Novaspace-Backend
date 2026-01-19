const CrudRepository = require('./crud-repo');
const { task } = require('../models/index');

class TaskRepository extends CrudRepository {
    constructor() {
        super(task);
    }
    async fetchWithCreator (filter, includeOptions) {
        try {
            const tasks = await this.model.findAll({
                where: filter,
                include: includeOptions
            });
            return tasks;
        } catch (error) {
            console.error('Error in fetchWithCreator:', error);
            throw error;
        }
    }
}

module.exports = TaskRepository;