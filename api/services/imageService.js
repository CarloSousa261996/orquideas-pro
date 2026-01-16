import { generateThumbnail, deleteImageFile, deleteThumbnailFile } from "../utils/imageUtils.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

/* Diretório atual */
/**
 * @type {string}
 * @description Diretório atual do arquivo.
 */
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Processa o upload de uma imagem e a renomeia com base no ID da orquídea.
 * Gera um thumbnail da imagem e o retorna como uma URL relativa à pasta de imagens.
 * @param {Express.Multer.File} file - O arquivo de imagem a ser processado.
 * @param {number} orchidId - O ID da orquídea a qual a imagem pertence.
 * @returns {Promise<{imagePath: string, thumbnailPath: string}>} Uma promessa que resolve com um objeto contendo a URL da imagem e do thumbnail.
 */
export async function processUploadedImage(file, orchidId) {
  if (!file) return { imagePath: null, thumbnailPath: null };

  // Renomear o arquivo com base no ID da orquídea
  // Gerar o thumbnail
  const ext = path.extname(file.originalname);
  // Renomear o arquivo
  const newFilename = `${orchidId}${ext}`;
  const oldPath = file.path;
  const newPath = path.join(path.dirname(oldPath), newFilename);

  fs.renameSync(oldPath, newPath);
  const imagePath = `/images/orchids/${newFilename}`;

  const thumbnailPath = await generateThumbnail(newPath);

  return { imagePath, thumbnailPath };
}

/**
 * Deleta a imagem e o thumbnail de uma orquídea com base na sua URL.
 * @param {string} imagePath - URL da imagem a ser deletada.
 */

export function deleteOrchidImages(imagePath) {
  if (!imagePath) return;

  // Deletar a imagem e o thumbnail
  const fullImagePath = path.join(path.dirname(fileURLToPath(import.meta.url)), "../../www", imagePath);
  const filename = path.basename(imagePath);
  // Caminho do thumbnail
  const thumbPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "../../www/images/orchids/thumbs", filename);

  deleteImageFile(fullImagePath);
  deleteThumbnailFile(thumbPath);
}
