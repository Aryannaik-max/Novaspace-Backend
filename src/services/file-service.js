const CrudService = require('./crud-service');
const FileRepository = require('../repositories/file-repo');

class FileService extends CrudService {
    constructor() {
        super(FileRepository);
    }   
}

module.exports = FileService;