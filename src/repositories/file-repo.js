const CrudRepository = require('./crud-repo');
const { file } = require('../models/index');

class FileRepository extends CrudRepository {
    constructor() {
        super(file);
    }

    async getByWorkspace(workspaceId) {
        try {
            const result = await this.model.findAll({
                where: { workspaceId }
            });
            return result;
        } catch (error) {
            console.log("Something went wrong in the File Repository");
            throw { error };
        }
    }

    async getWithCreator(filter, includeOptions) {
        try {
            const files = await this.model.findAll({
                where: filter ,
                include: includeOptions
            });
            return files;
        } catch (error) {
            console.error('Error in getWithCreator:', error);
            throw error;
        }
    }
}

module.exports = FileRepository;