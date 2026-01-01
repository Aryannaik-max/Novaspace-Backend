const FileService = require('../services/file-service');
const UploadToS3 = require('../utils/s3Upload');

const fileService = new FileService();

const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        const { workspaceId } = req.body;
        const uploadedBy = req.user.id;

        // Upload to S3
        const fileUrl = await UploadToS3(req.file);

        // Save file info to database
        const fileData = {
            name: req.file.originalname,
            size: req.file.size,
            url: fileUrl,
            uploadedBy: uploadedBy,
            workspaceId: workspaceId,
            type: req.file.mimetype
        };

        const savedFile = await fileService.create(fileData);

        return res.status(201).json({
            success: true,
            message: 'File uploaded successfully',
            data: savedFile
        });
    } catch (error) {
        console.error('File upload error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error uploading file',
            error: error
        });
    }
};

const getFilesByWorkspace = async (req, res) => {
    try {
        const { workspaceId } = req.params;
        const files = await fileService.getByWorkspace(workspaceId);

        return res.status(200).json({
            success: true,
            data: files
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error fetching files',
            error: error
        });
    }
};

const deleteFile = async (req, res) => {
    try {
        const { id } = req.params;
        await fileService.delete({ id });

        return res.status(200).json({
            success: true,
            message: 'File deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error deleting file',
            error: error
        });
    }
};

module.exports = {
    uploadFile,
    getFilesByWorkspace,
    deleteFile
};
