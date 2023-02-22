import express from "express";
import cors from "cors";
import { mkdirSync } from "node:fs";
import * as path from "node:path";
import { downloadsRouter } from "./routes/downloads";
import { filesRouter } from "./routes/files";
import { uploadsRouter } from "./routes/uploads";

const app = express();
app.use(express.json());
app.use(cors());

app.use('/uploads', uploadsRouter);
app.use('/downloads', downloadsRouter);
app.use('/files', filesRouter);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  mkdirSync(path.join(__dirname.slice(0, -4), '/tempDest'), { recursive: true });
  mkdirSync(path.join(__dirname.slice(0, -4), '/storage'), { recursive: true });
  console.log(`Server listening on port ${PORT}...`);
});