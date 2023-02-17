import express from "express";
import { downloadsRouter } from "./routes/downloads";
import { uploadsRouter } from "./routes/uploads";

const app = express();
app.use(express.json());

app.use('/uploads', uploadsRouter);
app.use('/downloads', downloadsRouter);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});