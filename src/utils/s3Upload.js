const s3 = require('../config/s3Config');
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const { AWS_BUCKET_NAME } = require('../config/serverConfig');

const UploadToS3 = async (file) => {
    const params = {
        Bucket: AWS_BUCKET_NAME,
        Key: file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype
    }

    const command = new PutObjectCommand(params);
    await s3.send(command);

    return `https://${AWS_BUCKET_NAME}.s3.amazonaws.com/${file.originalname}`;

    
}

module.exports = UploadToS3;