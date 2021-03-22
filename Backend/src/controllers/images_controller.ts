// import { Request, Response } from 'express';
// import multer from 'multer';
// import path from 'path'
// import { Storage } from '@google-cloud/storage';
// require('dotenv').config();


// const storage = new Storage({
//     projectId: 'imagespogar-308300',
//     credentials: {
//         client_email: 'imagenespogar@imagespogar-308300.iam.gserviceaccount.com',
//         private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDWYK+mnYhM21Ad\nrUyf7r0i4XW76tXNSA1EyxBPrEOXE8oV+CQBTJs3ZVJ5U2DZJkQKeQY/Pg+WpdMA\n/mUYQ2ICN/3tydGMuSkqvdHwQsg2mY0bnsQVxSJlc0r89FjdLZ9vMvK68cZtKtFo\n4FnwPihZCtfJeEglKAkDFV5JxOZilgOX4eei2cuz8C8sWrdUrySj6qFymXg4wI+O\nsJfZg9xRzSHgZ7ov2nGLsTXwMuhRmqTvxvn6t8TC+WQ76mibNFrUip0D+NksqnWc\nhQnHI0RGF1KZ784wY0qVVcKuyOrYasQ8obvrAf0wjt3e1i8Yug97Mp2XWN0zNPr3\nx0P4kbjFAgMBAAECggEAJG20m3L8hNbls81NjoXSlPlL+N1MbIA4ZP6+rFNA/wyp\nU/dhIuliHNU2YRCGjg/fEwqCwb9phbdy9iHEiw10O51JJJ2dYrTaJn2wDYxDmmeY\nX1+owWxIzoV7ciWRbjBA/fPh5FuOVOGoSRKKpfTiBVN+3Kj4VXwKoAADEDUJ0ymM\nEtjWi84GcpDymn5JSQJQsPYfE7bRLA7BlQ/z4gVIsyijudBvyLYLb9zpfTO9aMut\nkAV9qXySy71J6I/mFbEMZZi/xZlSwiGUtUWJ+CDcki/L3Up5EEg5esKPjmAKPXPl\nRcHoc4eFc6vBvKSZirb/O2/j7bM4hUQ6HimJ4dWj1wKBgQDyuwrXXOKqE/uFF3yx\nHUYfA85TENmKBDNBO+rsAA5zdBTmUJWJKH5tg6fM4mWZN7FI+bzHoLtiwFX2JQW3\n+NHHfPgaTGYXotmJvMdom+dRA6cuOdCAA2DmlWFQwbf7iZo+C7OwPqxmY9Dl0kGN\nTJMeIe691qq4ERuZ/Z9ZIXL74wKBgQDiGNnWBQ7/f3E9uEycUV9OHx7kMepMjHsP\n6qBo7ApIbp0HlpNdT4tGS385fX4sC2SZLBIWsrZMjkkNJ5kgdG4XGlpyetx1BozB\ndypAV4AdcL/Wpx9yVzsPavL6YZNxiydO5xn4SOExQnqm+YE3AH5jaf9IUhKVcFTQ\nynEbwrTpNwKBgG1FVKEVGJkWO9FzfFfDZPDLZtOwLy5Zq7U/QweREvBYnpv8RQUk\n7J1iemTauoAaOT4v5xM7QYA4M7qGeieS5OVYVdyI7iDP1/yQtnhaTu0Cpv1BW6J1\nYucK8m9HdgrPrFcoL3E1FalWYBFF8OqqQUR8ZBykCeCpGvLc4SJf04KfAoGBAJz5\nffxOhMw08i1U0LPS9yVpC+yJD0/YVPSHBJn0D2uciJ+lFmk5ecvzTMBgdYIk4tJJ\nu8FQkKr0OpnMfU8AJxMZM+S5kmgZhQ4pKweC+Kr4BekFHRsonxOkQFBAALtbTo5E\ne05bYyXtLvTQ07qZOCbTh+7xNH/Wfrx7YS5R74LfAoGBAMf3BNb7vUhjrZHUhSaM\nMYTNe3ruItpbPV0Wu+WlWPIR+3gT2+qmy5KFqRFvdoxWZGf4oYckaUMKDG4TuDGl\nNeGyo46qWEgv+wvz3hSslT7sLnoqBP4pb8S/Je5vbePLyYJfXgtcZvMELg5TbwVv\ns5gmjE2bKK5VXIEvQNSZRQgA\n-----END PRIVATE KEY-----\n'
//     }
// });

// const bucket = storage.bucket('imagenespogar');

// let uploadHandler = multer({
//     storage: multer.memoryStorage()
// });


// export const images = (uploadHandler.single('file'), (req: Request, res: Response) => {
//     console.log(req.file);
//     const newFileName = path.extname(req.file.originalname);
//     const blob = bucket.file(newFileName);
//     const blobStream = blob.createWriteStream({
//         resumable: false,
//         gzip: true
//     }).on('finish', () => {
//         const publicURL = `https://storage.googleapis.com/imagenespogar/${blob.name}`
//         const imageDetails=JSON.parse(req.body);
//         imageDetails.image = publicURL; res.json('ok');
//     });
//     blobStream.end(req.file.buffer);
//     res.json('ok');
// });