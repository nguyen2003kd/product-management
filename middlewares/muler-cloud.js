const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports.mulerCloud = (req, res, next) => {
    if (req.file) {
        const streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );
                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };

        async function upload(req) {
            try {
                const result = await streamUpload(req);
                req.body[req.file.fieldname] = result.url;
                next();
            } catch (error) {
                console.error('Upload to Cloudinary failed:', error);
                res.status(500).send('Upload ảnh thất bại. Vui lòng thử lại.');
            }
        }

        upload(req);
    } else {
        next();
    }
};
