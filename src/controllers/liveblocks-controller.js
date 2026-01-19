const { Liveblocks } = require('@liveblocks/node');
const { LIVEBLOCK_API_KEY } = require('../config/serverConfig');
const UserService = require('../services/user-service');

const userService = new UserService();

// Initialize Liveblocks with your secret key
const liveblocks = new Liveblocks({
    secret: LIVEBLOCK_API_KEY
});

const authenticate = async (req, res) => {
    try {
        // Check if user is authenticated via middleware
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                message: 'No token provided'
            });
        }

        const userId = req.user.id;
        const user = await userService.get({ id: userId });
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const session = liveblocks.prepareSession(
            String(userId),
            {
                userInfo: {
                    name: user.name ,
                    email: user.email,
                    avatar: user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=random`
                }
            }
        );

        session.allow(`workspace-*`, session.FULL_ACCESS);

        const { status, body } = await session.authorize();
        return res.status(status).send(body);
        
    } catch (error) {
        console.error('Liveblocks auth error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to authenticate with Liveblocks',
            error: error.message
        });
    }
};

const getUsers = async (req, res) => {
    try {
        const { userIds } = req.body;

        if (!userIds || !Array.isArray(userIds)) {
            return res.status(400).json({
                success: false,
                message: 'userIds must be an array'
            });
        }

        const users = await userService.getByIds(userIds);

        const formattedUsers = users.map(user => ({
            name: user.name,
            avatar: user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=random`
        }));

        return res.status(200).json(formattedUsers);
    } catch (error) {
        console.error('Get users error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch users',
            error: error.message
        });
    }
};

module.exports = {
    authenticate,
    getUsers
};
