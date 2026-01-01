const WorkspaceService = require('../services/workspace-service');
const workspaceService = new WorkspaceService();

const createWorkspace = async (req, res) => {
    try {
        const workspaceData = {
            name: req.body.name,
            description: req.body.description,
            ownerId: req.user.id
        };
        const workspace = await workspaceService.create(workspaceData);
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
        const workspaces = await workspaceService.get(req.user.id);
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
        await workspaceService.delete(workspaceId, req.user.id);
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

module.exports = {
    createWorkspace,
    getAllWorkspaces,   
    deleteWorkspace,
    updateWorkspace
};