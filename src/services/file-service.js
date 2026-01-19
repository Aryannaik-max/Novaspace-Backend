const CrudService = require('./crud-service');
const FileRepository = require('../repositories/file-repo');
const {user} = require('../models/index');

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

    async getWithCreator(workspaceId) {
        try {
            const files = await this.repository.getWithCreator(
                {workspaceId: Number(workspaceId)}, [
                    {
                        model: user,
                        as: 'uploader',
                        attributes: ['id', 'name', 'email']
                    }
                ]
             );
            return files;
        } catch {
            console.log("Something went wrong in the File Service - getWithCreator");
            throw { error };
        }
    }
}

module.exports = FileService;