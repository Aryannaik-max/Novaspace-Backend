const CrudService = require('./crud-service');
const WorkspaceMemberRepository = require('../repositories/workspacemember-repo');

class WorkspaceMemberService extends CrudService {
    constructor() {
        super(WorkspaceMemberRepository);
    }
}

module.exports = WorkspaceMemberService;