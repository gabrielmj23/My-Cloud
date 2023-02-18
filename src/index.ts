import express from "express";
import { downloadsRouter } from "./routes/downloads";
import { filesRouter } from "./routes/files";
import { uploadsRouter } from "./routes/uploads";

const app = express();
app.use(express.json());

app.use('/uploads', uploadsRouter);
app.use('/downloads', downloadsRouter);
app.use('/files', filesRouter);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});