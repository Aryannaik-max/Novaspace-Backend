const FileService = require('../services/file-service');
// CHANGE 1: Import the new Cloudinary helper
const UploadToCloudinary = require('../utils/UploadToCloudinay'); 

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

        // CHANGE 2: Call the Cloudinary function instead of S3
        // This returns the secure Cloudinary URL (e.g., https://res.cloudinary.com/...)
        const fileUrl = await UploadToCloudinary(req.file);

        // Save file info to database
        const fileData = {
            name: req.file.originalname,
            size: req.file.size,
            url: fileUrl, // <--- This now stores the Cloudinary URL
            uploadedBy: uploadedBy,
            workspaceId: Number(workspaceId),
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
        const workspaceId  = req.params.workspaceId;
        const files = await fileService.getWithCreator(workspaceId);

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