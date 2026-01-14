import sharp from "sharp";
import path from "path";
import fs from "fs";

const THUMBNAIL_WIDTH = 200;
const THUMBNAIL_HEIGHT = 200;

export async function generateThumbnail(imagePath) {
  try {
    const dir = path.dirname(imagePath);
    const filename = path.basename(imagePath);
    const thumbDir = path.join(dir, "thumbs");

    if (!fs.existsSync(thumbDir)) {
      fs.mkdirSync(thumbDir, { recursive: true });
    }

    const thumbPath = path.join(thumbDir, filename);

    await sharp(imagePath)
      .resize(THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT, {
        fit: "cover",
        position: "center",
      })
      .toFile(thumbPath);

    return `/images/orchids/thumbs/${filename}`;
  } catch (err) {
    console.error("Erro ao gerar thumbnail:", err);
    return null;
  }
}

export function deleteImageFile(imagePath) {
  try {
    if (imagePath && fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  } catch (err) {
    console.error("Erro ao deletar imagem:", err);
  }
}

export function deleteThumbnailFile(thumbPath) {
  try {
    if (thumbPath && fs.existsSync(thumbPath)) {
      fs.unlinkSync(thumbPath);
    }
  } catch (err) {
    console.error("Erro ao deletar thumbnail:", err);
  }
}
