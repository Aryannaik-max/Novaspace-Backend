const CrudRepository = require('./crud-repo');
const { file } = require('../models/index');

class FileRepository extends CrudRepository {
    constructor() {
        super(file);
    }
}

module.exports = FileRepository;