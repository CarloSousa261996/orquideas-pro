import { generateThumbnail, deleteImageFile, deleteThumbnailFile } from "../utils/imageUtils.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function processUploadedImage(file, orchidId) {
  if (!file) return { imagePath: null, thumbnailPath: null };

  const ext = path.extname(file.originalname);
  const newFilename = `${orchidId}${ext}`;
  const oldPath = file.path;
  const newPath = path.join(path.dirname(oldPath), newFilename);

  fs.renameSync(oldPath, newPath);
  const imagePath = `/images/orchids/${newFilename}`;

  const thumbnailPath = await generateThumbnail(newPath);

  return { imagePath, thumbnailPath };
}

export function deleteOrchidImages(imagePath) {
  if (!imagePath) return;

  const fullImagePath = path.join(path.dirname(fileURLToPath(import.meta.url)), "../../www", imagePath);
  const filename = path.basename(imagePath);
  const thumbPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "../../www/images/orchids/thumbs", filename);

  deleteImageFile(fullImagePath);
  deleteThumbnailFile(thumbPath);
}
