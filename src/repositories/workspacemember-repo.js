const { WorkspaceMember } = require('../models/index');
const CrudRepository = require('./crud-repo');

class WorkspaceMemberRepository extends CrudRepository {
    constructor() {
        super(WorkspaceMember);
    }
}

module.exports = WorkspaceMemberRepository;