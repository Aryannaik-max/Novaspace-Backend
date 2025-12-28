class CrudRepository {
    constructor (model) {
        this.model = model;
    }

    async create (data) {
        try {
            const result = await this.model.create(data);
            return result;
        } catch (error) {
            console.log("Something went wrong in the Crud Repository");
            throw { error };
        }
    }

    async delete (data) {
        try {
            const result = await this.model.destroy({
                where: data
            });
            return result;
        } catch (error) {
            console.log("Something went wrong in the Crud Repository");
            throw { error };
        }
    }
    
    async get (data) {
        try {
            const result = await this.model.findOne({
                where: data
            });
            return result;
        } catch (error) {
            console.log("Something went wrong in the Crud Repository");
            throw { error };
        }
    }

    async update (data, id) {
        try {
            const result = await this.model.update(data, {
                where: { id }
            });
            return result;
        } catch (error) {
            console.log("Something went wrong in the Crud Repository");
            throw { error };
        }
    }

    async getAll () {
        try {
            const result = await this.model.findAll();
            return result;
        } catch (error) {
            console.log("Something went wrong in the Crud Repository");
            throw { error };
        }
    }
}