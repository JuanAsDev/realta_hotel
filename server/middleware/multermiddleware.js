const multer = require("multer");

const allowedFileTypes = ["jpg", "jpeg", "png", "JPG", "PNG", "JPEG"];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const extname = file.originalname.split(".").pop();
  if (allowedFileTypes.includes(extname)) {
    cb(null, true);
  } else {
    cb(new Error("Jenis file tidak diizinkan"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
