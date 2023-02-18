import { Router } from "express";
import * as path from "node:path";
import { readdirSync, statSync } from "node:fs";

export const filesRouter = Router();
const STORAGE_DIR = path.join(__dirname.slice(0, -11), '/storage');

filesRouter.get('/', (req, res): void => {
  try {
    // Get all filenames from directory
    const paramDir = req.body.dir ?? '';
    const filesDir = path.join(STORAGE_DIR, paramDir);
    const files = readdirSync(filesDir);

    // Get file info from all gathered filenames
    const filesData: FileInfo[] = files.map((filename) => {
      const extension = path.extname(filename);
      const size = statSync(path.join(filesDir, filename)).size;
      return { filename, extension, size };
    });
    res.json({ files: filesData });
  } catch (err) {
    res.status(404).json({ error: 'Directory not found' });
  }
});