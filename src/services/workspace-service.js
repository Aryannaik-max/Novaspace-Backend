const CrudService = require('./crud-service');
const WorkspaceRepository = require('../repositories/workspace-repo');

class WorkspaceService extends CrudService {
    constructor() {
        super(WorkspaceRepository);
    }
}

module.exports = WorkspaceService;