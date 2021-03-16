"use strict";
// import { NextFunction, Request, Response } from 'express';
// import {format} from 'util';
// import Multer from 'multer';
// import {Storage} from '@google-cloud/storage';
// const storage = new Storage();
// const multer = Multer({
//   storage: Multer.memoryStorage(),
//   limits: {
//     fileSize: 5 * 1024 * 1024,
//   },
// });
// const bucket = storage.bucket('imagespogarbucket');
// // Process the file upload and upload to Google Cloud Storage.
// export const images = (multer.single('file'), (req: Request, res: Response, next: NextFunction) => {
//   if (!req.file) {
//     res.status(400).send('No file uploaded.');
//     return;
//   }
//   // Create a new blob in the bucket and upload the file data.
//   const blob = bucket.file(req.file.originalname);
//   const blobStream = blob.createWriteStream();
//   blobStream.on('error', err => {
//     next(err);
//   });
//   blobStream.on('finish', () => {
//     // The public URL can be used to directly access the file via HTTP.
//     const publicUrl = format(
//       `https://storage.googleapis.com/${bucket.name}/${blob.name}`
//     );
//     res.status(200).send(publicUrl);
//   });
//   blobStream.end(req.file.buffer);
// });
//# sourceMappingURL=images_controller.js.map