import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

/** Middleware de upload de imagens usando Multer.
 * Configura o armazenamento e o filtro de arquivos para aceitar apenas imagens.
 */
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, "../../www/images/orchids");
const thumbsDir = path.join(uploadsDir, "thumbs");

/* Criar diretórios se não existirem */
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

/* Criar diretório de thumbnails se não existir */
if (!fs.existsSync(thumbsDir)) {
  fs.mkdirSync(thumbsDir, { recursive: true });
}

const storage = multer.diskStorage({
/**
 * Fun o que define o destino dos arquivos upados.
 * Neste caso, o destino   o diret rio de uploads.
 * @param {Object} req - Requisi o atual.
 * @param {Object} file - Arquivo a ser salvo.
 * @param {Function} cb - Fun o de callback.
 */
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
/**
 * Fun o que define o nome do arquivo upado.
 * O nome do arquivo ser  um UUID baseado no ID da orqu dea (se houver) ou no timestamp atual,
 * seguido da extens o do arquivo original.
 * @param {Object} req - Requisi o atual.
 * @param {Object} file - Arquivo a ser salvo.
 * @param {Function} cb - Fun o de callback.
 */
  filename: (req, file, cb) => {
    const orchidId = req.body.orchid_id || Date.now();
    const ext = path.extname(file.originalname);
    cb(null, `${orchidId}${ext}`);
  },
});

/**
 * Fun o que verifica se o arquivo upado   uma imagem.
 * Verifica se o tipo de m dia do arquivo come a com "image/",
 * caso sim, permite o upload, caso contr rio, lan a um erro.
 * @param {Object} req - Requisi o atual.
 * @param {Object} file - Arquivo a ser salvo.
 * @param {Function} cb - Fun o de callback.
 */
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Apenas arquivos de imagem são permitidos"), false);
  }
};

/** Instância do middleware Multer configurada para upload de imagens. */
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

export default upload;
