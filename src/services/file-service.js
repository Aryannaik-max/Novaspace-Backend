const CrudService = require('./crud-service');
const FileRepository = require('../repositories/file-repo');

class FileService extends CrudService {
    constructor() {
        super(FileRepository);
    }

    async getByWorkspace(workspaceId) {
        try {
            const result = await this.repository.getByWorkspace(workspaceId);
            return result;
        } catch (error) {
            console.log("Something went wrong in the File Service");
            throw { error };
        }
    }
}

module.exports = FileService;