const CrudService = require('./crud-service');
const WorkspaceRepository = require('../repositories/workspace-repo');
const { WorkspaceMember } = require('../models');

class WorkspaceService extends CrudService {
    constructor() {
        super(WorkspaceRepository);
    }

    async getAllByOwner(ownerId) {
        try {
            // Now returns all workspaces (owned + member) with roles
            const workspaces = await this.repository.getAllWorkspacesForUser(ownerId);
            return workspaces;
        } catch (error) {
            console.log("Something went wrong in the Workspace Service");
            throw { error };
        }
    }

    async getByInviteCode(inviteCode) {
        try {
            const workspace = await this.repository.getWorkspaceByInviteCode(inviteCode);
            return workspace;
        } catch (error) {
            console.log("Something went wrong in the Workspace Service");
            throw { error };
        }
    }

    async joinbyInviteCode(inviteCode, userId) {
        try {
            const workspace = await this.getByInviteCode(inviteCode);
            if (!workspace) {
                throw { message: 'Invalid invite code' };
            }
            const existingMember = await WorkspaceMember.findOne({
                                    where: {
                                        workspaceId: workspace.id,
                                        userId: userId
                                    }
                                    });
            if (existingMember) {
                throw { message: 'User is already a member of this workspace' };
            }
            await WorkspaceMember.create({
                workspaceId: workspace.id,
                userId: userId,
                role: 'member' // Default role
            });
            return workspace;
        } catch (error) {
            console.log("Something went wrong in the Workspace Service");
            throw { error };
        }
    }

    async getById(id) {
        try {
            const workspace = await this.repository.get({id});
            return workspace;
        } catch (error) {
            console.log("Something went wrong in the Workspace Service");
            throw { error };
        }
    }

    async delete(whereObj) {
        try {
            if (whereObj && whereObj.id) {
                await WorkspaceMember.destroy({ where: { workspaceId: whereObj.id } });
            }
            const result = await this.repository.delete(whereObj);
            return result;
        } catch (error) {
            console.log("Something went wrong in the Workspace Service");
            throw { error };
        }
    }

    async getMembers(workspaceId) {
        try {
            const members = await this.repository.getMembersOfWorkspace(workspaceId);
            return members;
        } catch (error) {
            console.log("Something went wrong in the Workspace Service");
            throw { error };
        }
    }
}

module.exports = WorkspaceService;