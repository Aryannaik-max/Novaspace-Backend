const CrudRepository = require('./crud-repo');
const { user } = require('../models/index');

class UserRepository extends CrudRepository {
    constructor() {
        super(user);
    }
}

module.exports = UserRepository;