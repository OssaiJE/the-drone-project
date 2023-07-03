import path from 'path';
import multer, { FileFilterCallback } from 'multer';
import { NextFunction, Request, Response } from 'express';
import { existsSync, mkdirSync } from 'fs';
import { failure } from '../utilities/response';

/* multer storage object */
const storage = multer.diskStorage({
  destination(
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) {
    const uploadPath = 'uploads/';
    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename(
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const checkFileType = (file: Express.Multer.File, cb: FileFilterCallback) => {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(null, false);
  }
};

/* multer object used to upload files. */
const upload = multer({
  storage,
  fileFilter: function (req: Request, file: Express.Multer.File, cb: FileFilterCallback) {
    checkFileType(file, cb);
  },
  limits: {
    fileSize: 1024 * 1024 * 5 //5MB
  }
});

/**
 * If there's an error, return a 413 status code with the error message.
 * @returns  fileErrorHandler.
 */
const fileErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err) {
    return failure(413, err.message, res);
  } else {
    next();
  }
};

export { fileErrorHandler, upload };
