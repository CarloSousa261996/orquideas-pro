import * as orchidService from "../services/orchidService.js";
import * as imageService from "../services/imageService.js";

export async function getAllOrchids(req, res) {
  try {
    const orchids = await orchidService.getAllOrchids();
    res.json(orchids);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar orquídeas", details: err.message });
  }
}

export async function getOrchidById(req, res) {
  try {
    const orchid = await orchidService.getOrchidById(req.params.id);
    if (!orchid) return res.status(404).json({ error: "Orquídea não encontrada" });
    res.json(orchid);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar orquídea", details: err.message });
  }
}

export async function createOrchid(req, res) {
  try {
    const { description, genus_id, type_id, luminosity_id, temperature_id, humidity_id, size_id } = req.body;

    const { imagePath, thumbnailPath } = await imageService.processUploadedImage(req.file, null);

    const orchidId = await orchidService.createOrchid(description, genus_id, type_id, luminosity_id, temperature_id, humidity_id, size_id, imagePath);

    let finalImagePath = imagePath;
    let finalThumbnailPath = thumbnailPath;
    if (imagePath) {
      const { imagePath: correctedPath, thumbnailPath: correctedThumb } = await imageService.processUploadedImage(req.file, orchidId);
      finalImagePath = correctedPath;
      finalThumbnailPath = correctedThumb;
      await orchidService.updateOrchidImage(orchidId, correctedPath);
    }

    res.status(201).json({ id: orchidId, image: finalImagePath, thumbnail: finalThumbnailPath });
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar orquídea", details: err.message });
  }
}

export async function updateOrchid(req, res) {
  try {
    const { description, genus_id, type_id, luminosity_id, temperature_id, humidity_id, size_id } = req.body;

    let imagePath = null;
    if (req.file) {
      const { imagePath: path } = await imageService.processUploadedImage(req.file, req.params.id);
      imagePath = path;
    }

    const updated = await orchidService.updateOrchid(req.params.id, description, genus_id, type_id, luminosity_id, temperature_id, humidity_id, size_id, imagePath);

    if (!updated) return res.status(404).json({ error: "Orquídea não encontrada" });
    res.json({ success: true, image: imagePath });
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar orquídea", details: err.message });
  }
}

export async function deleteOrchid(req, res) {
  try {
    const imagePath = await orchidService.getOrchidImage(req.params.id);

    const deleted = await orchidService.deleteOrchid(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Orquídea não encontrada" });

    imageService.deleteOrchidImages(imagePath);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Erro ao remover orquídea", details: err.message });
  }
}
