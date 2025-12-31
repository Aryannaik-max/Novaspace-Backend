const CrudRepository = require('./crud-repo');
const { Workspace } = require('../models/index');

class WorkspaceRepository extends CrudRepository {
    constructor() {
        super(Workspace);
    }

}

module.exports = WorkspaceRepository;