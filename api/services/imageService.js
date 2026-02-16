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
 * Apenas salva a imagem original, sem gerar thumbnail.
 * @param {Express.Multer.File} file - O arquivo de imagem a ser processado.
 * @param {number} orchidId - O ID da orquídea a qual a imagem pertence.
 * @returns {Promise<{imagePath: string}>} Uma promessa que resolve com um objeto contendo a URL da imagem.
 */
export async function processUploadedImage(file, orchidId) {
  if (!file) return { imagePath: null };

  // Renomear o arquivo com base no ID da orquídea
  const ext = path.extname(file.originalname);
  // Renomear o arquivo
  const newFilename = `${orchidId}${ext}`;
  const oldPath = file.path;
  const newPath = path.join(path.dirname(oldPath), newFilename);

  fs.renameSync(oldPath, newPath);
  const imagePath = `/images/orchids/${newFilename}`;

  return { imagePath };
}

/**
 * Gera um thumbnail para uma imagem se ele não existir.
 * @param {string} imagePath - URL da imagem (ex: "/images/orchids/1.jpg")
 * @returns {Promise<string|null>} URL do thumbnail ou null se houver erro
 */
export async function ensureThumbnail(imagePath) {
  if (!imagePath) return null;

  try {
    const fullImagePath = path.join(path.dirname(fileURLToPath(import.meta.url)), "../../www", imagePath);
    const filename = path.basename(imagePath);
    const thumbDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "../../www/images/orchids/thumbs");
    const thumbPath = path.join(thumbDir, filename);

    // Verifica se o thumbnail já existe
    if (fs.existsSync(thumbPath)) {
      return `/images/orchids/thumbs/${filename}`;
    }

    // Verifica se a imagem original existe
    if (!fs.existsSync(fullImagePath)) {
      console.warn("Imagem original não encontrada:", fullImagePath);
      return null;
    }

    // Gera o thumbnail
    const thumbnailUrl = await generateThumbnail(fullImagePath);
    return thumbnailUrl;
  } catch (error) {
    console.error("Erro ao processar thumbnail para", imagePath, ":", error.message);
    return null;
  }
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
