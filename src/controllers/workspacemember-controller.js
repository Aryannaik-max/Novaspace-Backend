const WorkspaceMemberService = require('../services/workspacemember-service');
const workspaceMemberService = new WorkspaceMemberService();

const createWorkspaceMember = async (req, res) => {
    try {
        const memberData = {
            userId: req.body.userId,
            workspaceId: req.body.workspaceId,
            role: req.body.role || 'member'
        };
        const member = await workspaceMemberService.create(memberData);
        return res.status(201).json({
            data: member,
            success: true,
            message: 'Workspace member added successfully',
            err: {}
        });
    } catch (error) {
        console.error('Error in createWorkspaceMember controller:', error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Failed to add workspace member',
            err: error
        });
    }
};

const deleteWorkspaceMember = async (req, res) => {
    try {
        const memberId = req.params.id;
        await workspaceMemberService.delete({ id: memberId });
        return res.status(200).json({
            data: {},   
            success: true,
            message: 'Workspace member removed successfully',
            err: {}
        });
    } catch (error) {
        console.error('Error in deleteWorkspaceMember controller:', error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Failed to remove workspace member',
            err: error
        });
    }
};

const getWorkspaceMembers = async (req, res) => {
    try {
        const workspaceId = req.params.workspaceId; 
        const members = await workspaceMemberService.getAll({ workspaceId });
        return res.status(200).json({
            data: members,  
            success: true,
            message: 'Workspace members fetched successfully',
            err: {}
        });
    } catch (error) {
        console.error('Error in getWorkspaceMembers controller:', error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Failed to fetch workspace members',
            err: error
        });
    }
};

const updateWorkspaceMember = async (req, res) => {
    try {
        const memberId = req.params.id; 
        const updateData = req.body;
        const updatedMember = await workspaceMemberService.update(updateData, memberId);
        return res.status(200).json({
            data: updatedMember,
            success: true,
            message: 'Workspace member updated successfully',
            err: {}
        });
    } catch (error) {
        console.error('Error in updateWorkspaceMember controller:', error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Failed to update workspace member',
            err: error
        });
    }
};

module.exports = {
    createWorkspaceMember,
    deleteWorkspaceMember,
    getWorkspaceMembers,
    updateWorkspaceMember
};