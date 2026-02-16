import sharp from "sharp";
import path from "path";
import fs from "fs";

const THUMBNAIL_WIDTH = 200;
const THUMBNAIL_HEIGHT = 200;

/**
 * Gera um thumbnail da imagem fornecida e o retorna como uma URL
 * relativa à pasta de imagens.
 * @param {string} imagePath - O caminho da imagem a ser processada.
 * @returns {Promise<string|null>} - Uma promessa que se resolve com a URL
 * do thumbnail ou null caso haja um erro.
 */
export async function generateThumbnail(imagePath) {
  try {
    const dir = path.dirname(imagePath);
    const filename = path.basename(imagePath);
    const thumbDir = path.join(dir, "thumbs");

    // Extrair o tipo da orquídea a partir do caminho
    const pathParts = dir.split(path.sep);
    const orchidTypeIndex = pathParts.findIndex((part) => part === "orchids");
    const orchidType = orchidTypeIndex >= 0 && orchidTypeIndex < pathParts.length - 1 ? pathParts[orchidTypeIndex + 1] : "";

    if (!fs.existsSync(thumbDir)) {
      fs.mkdirSync(thumbDir, { recursive: true });
    }

    const thumbPath = path.join(thumbDir, filename);

    // Usar configurações tolerantes para lidar com JPEGs problemáticos
    await sharp(imagePath, { failOnError: false })
      .jpeg({ quality: 80, progressive: false, mozjpeg: false, force: true })
      .resize(THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT, {
        fit: "cover",
        position: "center",
        withoutEnlargement: false,
      })
      .toFile(thumbPath);

    const thumbnailUrl = orchidType ? `/images/orchids/${orchidType}/thumbs/${filename}` : `/images/orchids/thumbs/${filename}`;

    return thumbnailUrl;
  } catch (err) {
    console.error("Erro ao gerar thumbnail para", imagePath, ":", err.message);
    return null;
  }
}

/**
 * Deleta a imagem fornecida pelo caminho imagePath.
 * Se a imagem não existir, não faz nada.
 * Se houver um erro ao deletar a imagem, imprime uma mensagem de erro.
 * @param {string} imagePath - O caminho da imagem a ser deletada.
 */
export function deleteImageFile(imagePath) {
  try {
    if (imagePath && fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  } catch (err) {
    console.error("Erro ao deletar imagem:", err);
  }
}

/**
 * Deleta o thumbnail fornecido pelo caminho thumbPath.
 * Se o thumbnail não existir, não faz nada.
 * Se houver um erro ao deletar o thumbnail, imprime uma mensagem de erro.
 * @param {string} thumbPath - O caminho do thumbnail a ser deletado.
 */
export function deleteThumbnailFile(thumbPath) {
  try {
    if (thumbPath && fs.existsSync(thumbPath)) {
      fs.unlinkSync(thumbPath);
    }
  } catch (err) {
    console.error("Erro ao deletar thumbnail:", err);
  }
}
