import multer from "multer";

const imageFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(
      new Error(
        "Only image files with extensions .jpg, .jpeg, .png, or .gif are allowed"
      ),
      false
    );
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: imageFileFilter,
});

export default upload;
