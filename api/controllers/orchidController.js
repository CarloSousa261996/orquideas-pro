import { OrchidService } from "../services/orchidService.js";
import * as imageService from "../services/imageService.js";

const orchidService = new OrchidService();
/**
 * Retorna todas as orquídeas.
 * @returns {Promise<Array<Orchid>>} Uma promessa que resolve com um array de objetos Orchid.
 */
export async function getAllOrchids(req, res) {
  try {
    const orchids = await orchidService.getAll();
    res.json(orchids);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar orquídeas", details: err.message });
  }
}

/**
 * Retorna uma orquídea com base no seu ID.
 * @param {Request} req - Uma requisição com um parâmetro "id" contendo o ID da orquídea.
 * @param {Response} res - Uma resposta que será enviada com os dados da orquídea.
 * @returns {Promise<Response>} Uma promessa que resolve com uma resposta contendo os dados da orquídea.
 * @throws {Error} Se houver um erro ao buscar a orquídea.
 */
export async function getOrchidById(req, res) {
  try {
    const orchid = await orchidService.getById(req.params.id);

    if (!orchid) return res.status(404).json({ error: "Orquídea não encontrada" });
    res.json(orchid);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar orquídea", details: err.message });
  }
}

/**
 * Cria uma nova orquídea com base nos dados enviados na requisição.
 * Se houver um arquivo de imagem na requisição, ele será processado e salvo na pasta de imagens.
 * Se a imagem for salva com sucesso, a URL da imagem será atualizada na base de dados.
 * @param {Request} req - Uma requisição com os dados da orquídea.
 * @param {Response} res - Uma resposta que será enviada com os dados da orquídea.
 * @returns {Promise<Response>} Uma promessa que resolve com uma resposta contendo os dados da orquídea.
 * @throws {Error} Se houver um erro ao criar a orquídea.
 */
export async function createOrchid(req, res) {
  try {
    /**
     * @type {string}
     * @description Descrição da orquídea.
     * @required
     * @example "Orquídea 1"
     * @type {number}
     * @description ID do gênero da orquídea.
     * @required
     */
    const { description, genus_id, type_id, luminosity_id, temperature_id, humidity_id, size_id } = req.body;

    const { imagePath, thumbnailPath } = await imageService.processUploadedImage(req.file, null);

    const orchidId = await orchidService.create(description, genus_id, type_id, luminosity_id, temperature_id, humidity_id, size_id, imagePath);

    let finalImagePath = imagePath;
    let finalThumbnailPath = thumbnailPath;
    if (imagePath) {
      const { imagePath: correctedPath, thumbnailPath: correctedThumb } = await imageService.processUploadedImage(req.file, orchidId);
      finalImagePath = correctedPath;
      finalThumbnailPath = correctedThumb;
      await orchidService.updateImage(orchidId, correctedPath);
    }

    res.status(201).json({ id: orchidId, image: finalImagePath, thumbnail: finalThumbnailPath });
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar orquídea", details: err.message });
  }
}

/**
 * Atualiza uma orquídea com base nos dados enviados na requisição.
 * Se houver um arquivo de imagem na requisição, ele será processado e salvo na pasta de imagens.
 * Se a imagem for salva com sucesso, a URL da imagem será atualizada na base de dados.
 * @param {Request} req - Uma requisição com os dados da orquídea.
 * @param {Response} res - Uma resposta que será enviada com os dados da orquídea.
 * @returns {Promise<Response>} Uma promessa que resolve com uma resposta contendo os dados da orquídea.
 * @throws {Error} Se houver um erro ao atualizar a orquídea.
 */
export async function updateOrchid(req, res) {
  try {
    const { description, genus_id, type_id, luminosity_id, temperature_id, humidity_id, size_id } = req.body;

    let imagePath = null;
    if (req.file) {
      const { imagePath: path } = await imageService.processUploadedImage(req.file, req.params.id);
      imagePath = path;
    }

    const updated = await orchidService.update(req.params.id, description, genus_id, type_id, luminosity_id, temperature_id, humidity_id, size_id, imagePath);

    if (!updated) return res.status(404).json({ error: "Orquídea não encontrada" });
    res.json({ success: true, image: imagePath });
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar orquídea", details: err.message });
  }
}

/**
 * Remove uma orquídea com base no seu ID.
 * @param {Request} req - Uma requisição com um parâmetro "id" contendo o ID da orquídea.
 * @param {Response} res - Uma resposta que será enviada com os dados da orquídea.
 * @returns {Promise<Response>} Uma promessa que resolve com uma resposta contendo os dados da orquídea.
 * @throws {Error} Se houver um erro ao remover a orquídea.
 */

export async function deleteOrchid(req, res) {
  try {
    const imagePath = await orchidService.getOrchidImage(req.params.id);

    const deleted = await orchidService.delete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Orquídea não encontrada" });

    imageService.deleteOrchidImages(imagePath);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Erro ao remover orquídea", details: err.message });
  }
}
