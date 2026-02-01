const CrudRepository = require('./crud-repo');
const { Workspace, WorkspaceMember, user } = require('../models/index');
const { where } = require('sequelize');

class WorkspaceRepository extends CrudRepository {
    constructor() {
        super(Workspace);
    }

    async getAllWorkspacesForUser(userId) {
        try {
            const ownedWorkspaces = await this.model.findAll({
                where: { ownerId: userId },
                raw: true
            });

            const ownedWithRole = ownedWorkspaces.map(ws => ({
                ...ws,
                role: 'Admin'
            }));


            const memberWorkspaces = await WorkspaceMember.findAll({
                where: { userId: userId },
                include: [{
                    model: Workspace,
                    as: 'Workspace'
                }],
                raw: true,
                nest: true
            });

            const memberWithRole = memberWorkspaces
                .filter(m => m.Workspace && m.Workspace.ownerId !== userId)
                .map(m => ({
                    ...m.Workspace,
                    role: m.role
                }));

            return [...ownedWithRole, ...memberWithRole];
        } catch (error) {
            console.log("Something went wrong in WorkspaceRepository.getAllWorkspacesForUser");
            throw { error };
        }  
    }

    async getWorkspaceByInviteCode(inviteCode, includeOptions) {
        try {
            const workspace = await this.model.findOne({
                where: { inviteCode: inviteCode },
                include: includeOptions
            });
            return workspace;
        } catch (error) {
            console.log("Something went wrong in WorkspaceRepository.getWorkspaceByInviteCode");
            throw { error };
        }
    }

    async getMembersOfWorkspace(workspaceId) {
        try {
            const members = await WorkspaceMember.findAll({
            where: { workspaceId },
            include: [{
                model: user,
                attributes: ['id', 'name', 'email']
            }]
            });

            return members;
        } catch (error) {
            console.log("Something went wrong in WorkspaceRepository.getMembersOfWorkspace");
            throw { error };
        }
}

}

module.exports = WorkspaceRepository;