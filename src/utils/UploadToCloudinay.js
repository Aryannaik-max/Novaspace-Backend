const cloudinary = require('../config/cloudinaryConfig');

const UploadToCloudinary = async (file) => {
    
    return new Promise((resolve, reject) => {
        
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: 'auto', 
            },
            (error, result) => {
                if (error) {
                    console.error('Cloudinary Upload Error:', error);
                    reject(error);
                } else {
                    resolve(result.secure_url); 
                }
            }
        );
        uploadStream.end(file.buffer);
    });
}

module.exports = UploadToCloudinary;