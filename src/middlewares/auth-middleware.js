const UserService = require('../services/user-service');

const userService = new UserService();

async function authMiddleware (req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({ error: 'No token provided' });
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }
        const userId = await userService.isAuthenticated(token);
        req.user = { id: userId };
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }   
}

module.exports = authMiddleware;
