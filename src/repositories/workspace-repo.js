const CrudRepository = require('./crud-repo');
const { Workspace, WorkspaceMember, user } = require('../models/index');

class WorkspaceRepository extends CrudRepository {
    constructor() {
        super(Workspace);
    }

    // Get all workspaces where user is owner OR member, with role info
    async getAllWorkspacesForUser(userId) {
        try {
            // Get workspaces where user is owner
            const ownedWorkspaces = await this.model.findAll({
                where: { ownerId: userId },
                raw: true
            });

            // Add 'Admin' role to owned workspaces
            const ownedWithRole = ownedWorkspaces.map(ws => ({
                ...ws,
                role: 'Admin'
            }));

            // Get workspaces where user is a member (not owner)
            const memberWorkspaces = await WorkspaceMember.findAll({
                where: { userId: userId },
                include: [{
                    model: Workspace,
                    as: 'Workspace'
                }],
                raw: true,
                nest: true
            });

            // Filter out workspaces where user is already owner and add role
            const memberWithRole = memberWorkspaces
                .filter(m => m.Workspace && m.Workspace.ownerId !== userId)
                .map(m => ({
                    ...m.Workspace,
                    role: m.role
                }));

            // Combine and return all workspaces
            return [...ownedWithRole, ...memberWithRole];
        } catch (error) {
            console.log("Something went wrong in WorkspaceRepository.getAllWorkspacesForUser");
            throw { error };
        }  
    }

    async getWorkspaceByInviteCode(inviteCode) {
        try {
            const workspace = await this.model.findOne({
                where: { inviteCode: inviteCode },
            });
            return workspace;
        } catch (error) {
            console.log("Something went wrong in WorkspaceRepository.getWorkspaceByInviteCode");
            throw { error };
        }
    }

}

module.exports = WorkspaceRepository;