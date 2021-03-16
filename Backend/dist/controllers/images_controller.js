"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.images = exports.multer = void 0;
const util_1 = require("util");
const multer_1 = __importDefault(require("multer"));
const storage_1 = require("@google-cloud/storage");
const storage = new storage_1.Storage();
exports.multer = multer_1.default({
    storage: multer_1.default.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});
const bucket = storage.bucket('imagespogarbucket');
// Process the file upload and upload to Google Cloud Storage.
exports.images = (exports.multer.single('file'), (req, res, next) => {
    if (!req.file) {
        res.status(400).send('No file uploaded.');
        return;
    }
    // Create a new blob in the bucket and upload the file data.
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream();
    blobStream.on('error', err => {
        next(err);
    });
    blobStream.on('finish', () => {
        // The public URL can be used to directly access the file via HTTP.
        const publicUrl = util_1.format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
        res.status(200).send(publicUrl);
    });
    blobStream.end(req.file.buffer);
});
//# sourceMappingURL=images_controller.js.map