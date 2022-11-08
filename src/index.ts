import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import bookmarkImage from "./features/bookmark-image/index.js";
import getImage from "./features/get-image/index.js";
import uploadImage from "./features/upload-image/index.js";
import { handleError } from "./utils/middleware.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({ origin: true }));

app.use((req, res, next) => {
  handleError(express.json(), req, res, next);
});

app.get("/api", (_, res) => {
  res.sendStatus(400);
});

/// Uploads an image to IPFS using webpack
app.post("/api/upload-image", async (req, res) => {
  await uploadImage(req, res);
});

/// Bookmarks an image with a keyword
app.post("/api/bookmark-image", async (req, res) => {
  await bookmarkImage(req, res);
});

/// Gets the image linked to the id
app.post("/api/image/*", async (req, res) => {
  await getImage(req, res);
});

/// Returns relevant server stats and logs.
app.get("/api/server-stats", (_, res) => {
  res.sendStatus(400);
});

app.listen(PORT, () => {
  console.log(`🔥 [server]: Server is running at https://localhost:${PORT}`);
});
