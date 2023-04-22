/* This code is importing the `multer` and `path` modules in JavaScript. It then exports a `multer`
configuration object called `upload` that specifies the storage and file filter options for handling
file uploads. The `fileFilter` function checks the file extension of the uploaded file and only
allows `.jpg`, `.jpeg`, and `.png` files to be uploaded. Finally, the `upload` object is exported as
the default export of the module. */
import multer from 'multer'
import path from 'path'
// Multer config
export const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});
export default upload