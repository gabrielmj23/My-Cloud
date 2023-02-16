import express from "express";
import { uploadsRouter } from "./uploadsRouter";

const app = express();
app.use(express.json());

app.use('/uploads', uploadsRouter);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});