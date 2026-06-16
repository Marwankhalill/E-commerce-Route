import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { AppError } from "./AppError.js";

// const upload = multer({ dest: "uploads/" });
export const fileUpload = (folderName) => {
  function fileFilter(req, file, cb) {
    console.log(file);

    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new AppError("images only", 401), false);
    }
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `uploads/${folderName}`);
    },
    filename: (req, file, cb) => {
      //   console.log(file);
      cb(null, uuidv4() + "-" + file.originalname);
    },
  });

  const upload = multer({
    storage,
    fileFilter,
    // limits: {
    //   fileSize: 1024 * 1024 * 5,
    // },
  });
  return upload;
};

export const uploadSingleFile = (fileName, folderName) =>
  fileUpload(folderName).single(fileName);
export const uploadMixOfFiles = (arrayOfFileds, folderName) =>
  fileUpload(folderName).fields(arrayOfFileds);
