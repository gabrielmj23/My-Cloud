import { Router } from "express";
import * as path from "node:path";

export const downloadsRouter = Router();

downloadsRouter.get('/', (req: DownloadRequest, res) => {
  try {
    const downloadPath: string = req.body.downloadPath;
    res.sendFile(path.join(__dirname.slice(0, -11), '/storage', downloadPath));
  } catch (err) {
    res.status(404).json({ error: 'File was not found' });
  }
});