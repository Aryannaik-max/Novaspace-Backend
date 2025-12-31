const CrudRepository = require('./crud-repo');
const { task } = require('../models/index');

class TaskRepository extends CrudRepository {
    constructor() {
        super(task);
    }
}

module.exports = TaskRepository;