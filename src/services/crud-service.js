class CrudService {
    constructor(repository) {
        this.repository = new repository();
    }

    async create(data) {
        try {
            const result = await this.repository.create(data);
            return result;
        } catch (error) {
            console.log("Something went wrong in the Crud Service");
            throw { error };
        }
    }

    async delete(data) {
        try {
            const result = await this.repository.delete(data);
            return result;
        } catch (error) {
            console.log("Something went wrong in the Crud Service");
            throw { error };
        }
    }

    async get(data) {
        try {
            const result = await this.repository.get(data);
            return result;
        } catch (error) {
            console.log("Something went wrong in the Crud Service");
            throw { error };
        }
    }

    async update(data, id) {
        try {
            const result = await this.repository.update(data, id);
            return result;
        } catch (error) {
            console.log("Something went wrong in the Crud Service");
            throw { error };
        }
    }
    
    async getAll(filter = {}) {
        try {
            const result = await this.repository.getAll(filter);
            return result;
        } catch (error) {
            console.log("Something went wrong in the Crud Service");
            throw { error };
        }
    }
}

module.exports = CrudService;