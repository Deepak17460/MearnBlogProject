import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';

const storage = new GridFsStorage({
    url: 'mongodb+srv://root:root@blog-app.fcljhlo.mongodb.net/?retryWrites=true&w=majority',
    file: (request, file) => {
       

        // Check if the uploaded file exists
        if (!file) {
            return { error: 'File not found' };
        }

        const match = ['image/png', 'image/jpeg'];

        // Check if the file's mimetype is supported
        if (match.indexOf(file.mimetype) === -1) {
            return `${Date.now()}-blog-${file.originalname}`;
        }

        return {
            bucketName: 'photos',
            filename: `${Date.now()}-blog-${file.originalname}`,
        };
    },
});

export default multer({ storage });
