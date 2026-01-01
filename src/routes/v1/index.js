const express = require('express');
const router = express.Router();
const WorkspaceController = require('../../controllers/workspace-controller');
const WorkspaceMemberController = require('../../controllers/workspacemember-controller');
const UserController = require('../../controllers/user-controller');
const TaskController = require('../../controllers/task-controller');
const FileController = require('../../controllers/file-controller');
const authMiddleware = require('../../middlewares/auth-middleware');
const upload = require('../../middlewares/upload-middleware');

// User routes
router.post('/signup', UserController.createUser);
router.post('/signin', UserController.signInUser);
router.get('/profile', authMiddleware, UserController.getUserProfile);

// Workspace routes
router.post('/workspaces', authMiddleware, WorkspaceController.createWorkspace);
router.get('/workspaces', authMiddleware, WorkspaceController.getAllWorkspaces);
router.delete('/workspaces/:id', authMiddleware, WorkspaceController.deleteWorkspace);

// Workspace Member routes
router.post('/workspaces/:id/members', authMiddleware, WorkspaceMemberController.addMember);
router.get('/workspaces/:id/members', authMiddleware, WorkspaceMemberController.getMembers);
router.delete('/workspaces/:id/members/:memberId', authMiddleware, WorkspaceMemberController.removeMember);

// Task routes
router.post('/tasks', authMiddleware, TaskController.createTask);
router.get('/tasks', authMiddleware, TaskController.getAllTasks);
router.delete('/tasks/:id', authMiddleware, TaskController.deleteTask);

// File routes
router.post('/files', authMiddleware, upload.single('file'), FileController.uploadFile);
router.get('/files/:workspaceId', authMiddleware, FileController.getFilesByWorkspace);
router.delete('/files/:id', authMiddleware, FileController.deleteFile);

module.exports = router;