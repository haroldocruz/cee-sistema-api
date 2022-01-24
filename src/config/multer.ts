import multer, { Options } from 'multer';
import path from "path";
import crypto from 'crypto';

const MulterOptions: Options = {
    limits: { fileSize: 2000000 },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(bmp|gif|jpg|jpeg|png)$/)) {
            cb(new Error('Please upload JPG and PNG images only!'));
        }
        cb(undefined, true);

    },
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename(req, file, callback) {
            // const hash = crypto.randomBytes(6).toString('hex');
            // const fileName = `${hash}-${file.originalname}`;
            const id = req.body._id || req.params.id;
            const hash = id;
            const fileName = `${hash}-account-image.jpg`;


            callback(null, fileName);
        }
    }),
};

export default MulterOptions;