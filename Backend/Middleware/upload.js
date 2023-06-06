const multer = require('multer');

//Configuration for Multer
// const multerStorageBook = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null,'assets/imgs/books');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `image-${file.fieldname}-${Date.now()}.${ext}`);
//   },
// });

const multerStorageBook = multer.diskStorage({

  destination : "assets/imgs/books",
  filename : (req, file, cb) =>
  {
    cb(null, `${Date.now()}--${file.originalname}`)
  }

})
// Configuration for Multer
const multerStorageAuthor = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'assets/imgs/authors');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `image-${file.fieldname}-${Date.now()}.${ext}`);
  },
});

// Multer Filter for only images
const multerFilter = (req, file, cb) => {
  if (
    file.mimetype == 'image/png' ||
    file.mimetype == 'image/jpg' ||
    file.mimetype == 'image/jpeg'||
    file.mimetype == 'image/webp'

  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error('Only .png, .jpg .jpeg and .webp format allowed!'));
  }
};

module.exports = { multerFilter, multerStorageBook,
   multerStorageAuthor 
  };