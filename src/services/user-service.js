const CrudService = require('./crud-service');
const UserRepository = require('../repositories/user-repo');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/serverConfig');
const { Op } = require('sequelize');

class UserService extends CrudService {
    constructor() {
        super(UserRepository);
    }

    async signUp (userData) {
        try {
            const user = await this.repository.create(userData);
            return user;
        } catch (error) {
            console.error('Error in signUp:', error);
            throw error;
        }
    }

    async signIn (email, plainPassword) {
        try {
            const userByEmail = await this.repository.get({ email: email });
            if(!userByEmail) {
                throw { error: 'Invalid email or password' };
            }
            const passwordsMatch = await bcrypt.compare(plainPassword, userByEmail.password);
            if(!passwordsMatch) {
                throw { error: 'Invalid email or password' };
            }
            const jwtToken = this.createToken({email: userByEmail.email, id: userByEmail.id});
            return jwtToken;
        } catch (error) {
            console.error('Error in signIn:', error);
            throw error;
        }
    }

    async createToken (payload) {
        try {
            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
            return token;
        } catch (error) {
            console.log('Error in createToken:', error);    
            throw { error };
        }
    }

    async isAuthenticated (token) {
        try {
            const response = jwt.verify(token, JWT_SECRET);
            if(!response) {
                throw { error: 'Invalid token' };
            }
            const user = await this.repository.get({ id: response.id });
            if(!user) {
                throw { error: 'Invalid token' };
            }
            return user.id;
        } catch (error) {
            console.error('Error in isAuthenticated:', error);
            throw { error: 'Invalid token' };
        }
    }

    async getByIds(userIds) {
        try {
            const users = await this.repository.getAll({
                id: {
                        [Op.in]: userIds
                    }
                    });
                return users;
        } catch (error) {
            console.log("Something went wrong in UserService getByIds");
            throw error;
        }
    }




}

module.exports = UserService;