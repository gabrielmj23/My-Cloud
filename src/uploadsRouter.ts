import { Router } from "express";
import multer, { MulterError } from "multer";
import { copyFileSync, constants, mkdirSync, unlinkSync } from "node:fs";
import * as path from "node:path";

// Set up multer upload
const TEMPDEST_PATH = path.join(__dirname.slice(0, -4), '/tempDest');
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, TEMPDEST_PATH);
  },
  filename: (_req, file, cb) => {
    cb(null, file.originalname.split(' ').join('-'));
  }
});
const upload = multer({
  storage: storage
});

export const uploadsRouter = Router();

// Upload a file to given path
uploadsRouter.post('/', upload.single('file'), async (req, res) => {
  try {
    const uploadPath: string = req.body.uploadPath;
    const filename = (req as RequestWithFile).file.originalname;

    // Move uploaded file to desired destination
    mkdirSync(path.join(__dirname.slice(0, -4), '/storage', uploadPath), { recursive: true });
    copyFileSync(path.join(TEMPDEST_PATH, filename), path.join(__dirname.slice(0, -4), '/storage', uploadPath, filename), constants.COPYFILE_EXCL);
    unlinkSync(path.join(TEMPDEST_PATH, filename));

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    if (err instanceof MulterError) {
      res.status(500).json({ error: err.message });
    }
    else {
      res.status(500).json({ error: err });
    }
  }
});