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
                    name: user.name || 'Anonymous',
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

module.exports = {
    authenticate
};
