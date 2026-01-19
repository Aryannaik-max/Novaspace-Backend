const { get } = require('../routes/v1');
const WorkspaceService = require('../services/workspace-service');
const { WorkspaceMember } = require('../models/index');
const workspaceService = new WorkspaceService();

const createWorkspace = async (req, res) => {
    try {
        const workspaceData = {
            name: req.body.name,
            description: req.body.description,
            ownerId: req.user.id,
            inviteCode: Math.random().toString(36).substring(2, 10).toUpperCase()
        };
        const workspace = await workspaceService.create(workspaceData);
        await WorkspaceMember.create({
            userId: req.user.id,
            workspaceId: workspace.id,
            role: 'admin'
        });
        return res.status(201).json({
            data: workspace,
            success: true,
            message: 'Workspace created successfully',
            err: {}
        });
    } catch (error) {
        console.error('Error in createWorkspace controller:', error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Failed to create workspace',
            err: error
        });
    }
};

const getAllWorkspaces = async (req, res) => {
    try {
        const workspaces = await workspaceService.getAllByOwner(req.user.id);
        return res.status(200).json({
            data: workspaces,
            success: true,
            message: 'Workspaces fetched successfully',
            err: {}
        }); 
    } catch (error) {
        console.error('Error in getAllWorkspaces controller:', error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Failed to fetch workspaces',
            err: error
        });
    }
};

const deleteWorkspace = async (req, res) => {
    try {
        const workspaceId = req.params.id;
        await workspaceService.delete({ id: workspaceId });
        return res.status(200).json({
            data: {},   
            success: true,
            message: 'Workspace deleted successfully',
            err: {}
        });
    } catch (error) {
        console.error('Error in deleteWorkspace controller:', error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Failed to delete workspace',
            err: error
        });
    }
};

const updateWorkspace = async (req, res) => {
    try {
        const workspaceId = req.params.id;
        const updateData = req.body;
        const updatedWorkspace = await workspaceService.update(workspaceId, updateData, req.user.id);
        return res.status(200).json({
            data: updatedWorkspace,
            success: true,
            message: 'Workspace updated successfully',
            err: {}
        });
    } catch (error) {
        console.error('Error in updateWorkspace controller:', error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Failed to update workspace',
            err: error
        });
    }
};

const getWorkspaceByInviteCode = async (req, res) => {
    try {
        const inviteCode = req.params.inviteCode;
        const workspace = await workspaceService.getByInviteCode(inviteCode);
        return res.status(200).json({
            data: workspace,
            success: true,
            message: 'Workspace fetched successfully',
            err: {}
        });
    } catch (error) {
        console.error('Error in getWorkspaceByInviteCode controller:', error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Failed to fetch workspace',
            err: error
        });
    }

};

const joinbyInviteCode = async (req, res) => {
    try {
        const inviteCode = req.body.inviteCode;
        const userId = req.user.id;
        const workspace = await workspaceService.joinbyInviteCode(inviteCode, userId);
        return res.status(200).json({
            data: workspace,
            success: true,
            message: 'Joined workspace successfully',
            err: {}
        });
    } catch (error) {
        console.error('Error in joinbyInviteCode controller:', error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Failed to join workspace',
            err: error
        });
    } 
};

const getWorkspaceById = async (req, res) => {
    try {
        const workspaceId = req.params.id;
        const workspace = await workspaceService.getById(workspaceId);
        return res.status(200).json({
            data: workspace,
            success: true,
            message: 'Workspace fetched successfully',
            err: {}
        });
    } catch (error) {
        console.error('Error in getWorkspaceById controller:', error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Failed to fetch workspace',
            err: error
        });
    }
} 

const getWorkspaceMembers = async (req, res) => {
    try {
        const workspaceId = req.params.id;
        const members = await workspaceService.getMembers(workspaceId);
        return res.status(200).json({
            data: members,
            success: true,
            message: 'Workspace members fetched successfully',
            err: {}
        });
    } catch (error) {
        console.log('Error in getWorkspaceMembers controller:', error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Failed to fetch workspace members',
            err: error
        });
    }
}


module.exports = {
    createWorkspace,
    getAllWorkspaces,   
    deleteWorkspace,
    updateWorkspace,
    getWorkspaceByInviteCode,
    joinbyInviteCode,
    getWorkspaceById,
    getWorkspaceMembers
};