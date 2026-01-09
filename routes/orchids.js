import express from "express";
import pool from "../api/config/database.js";
import upload from "../api/middleware/upload.js";
import { generateThumbnail, deleteImageFile, deleteThumbnailFile } from "../api/utils/imageUtils.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const router = express.Router();

// GET /api/orchids - Lista todas as orquídeas
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT o.*, g.description as genus, t.description as type, l.description as luminosity, te.description as temperature, h.description as humidity, s.description as size
      FROM orchid o
      JOIN genus g ON o.genus_id = g.id
      JOIN type t ON o.type_id = t.id
      JOIN luminosity l ON o.luminosity_id = l.id
      JOIN temperature te ON o.temperature_id = te.id
      JOIN humidity h ON o.humidity_id = h.id
      JOIN size s ON o.size_id = s.id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar orquídeas", details: err.message });
  }
});

// GET /api/orchids/:id - Obter uma orquídea pelo ID
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `
      SELECT o.*, g.description as genus, t.description as type, l.description as luminosity, te.description as temperature, h.description as humidity, s.description as size
      FROM orchid o
      JOIN genus g ON o.genus_id = g.id
      JOIN type t ON o.type_id = t.id
      JOIN luminosity l ON o.luminosity_id = l.id
      JOIN temperature te ON o.temperature_id = te.id
      JOIN humidity h ON o.humidity_id = h.id
      JOIN size s ON o.size_id = s.id
      WHERE o.id = ?
    `,
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: "Orquídea não encontrada" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar orquídea", details: err.message });
  }
});

// POST /api/orchids - Criar nova orquídea com upload de imagem
router.post("/", upload.single("image"), async (req, res) => {
  try {
    console.log("POST /api/orchids body:", req.body);
    const { description, genus_id, type_id, luminosity_id, temperature_id, humidity_id, size_id } = req.body;

    // Inserir orquídea na DB
    const [result] = await pool.query(
      `INSERT INTO orchid (description, genus_id, type_id, luminosity_id, temperature_id, humidity_id, size_id, image)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [description, genus_id, type_id, luminosity_id, temperature_id, humidity_id, size_id, null]
    );

    const orchidId = result.insertId;
    let imagePath = null;
    let thumbnailPath = null;

    // Se houver imagem, renomear arquivo e gerar thumbnail
    if (req.file) {
      const ext = path.extname(req.file.originalname);
      const newFilename = `${orchidId}${ext}`;
      const oldPath = req.file.path;
      const newPath = path.join(path.dirname(oldPath), newFilename);

      // Renomear arquivo para usar o ID da orquídea
      fs.renameSync(oldPath, newPath);
      imagePath = `/images/orchids/${newFilename}`;

      // Gerar thumbnail
      thumbnailPath = await generateThumbnail(newPath);

      // Atualizar DB com caminho da imagem
      await pool.query(`UPDATE orchid SET image=? WHERE id=?`, [imagePath, orchidId]);
    }

    res.status(201).json({ id: orchidId, image: imagePath, thumbnail: thumbnailPath });
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar orquídea", details: err.message });
  }
});

// PUT /api/orchids/:id - Atualizar orquídea com upload de imagem
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { description, genus_id, type_id, luminosity_id, temperature_id, humidity_id, size_id } = req.body;
    let imagePath = null;

    // Se houver arquivo enviado, salvar imagem
    if (req.file) {
      const ext = path.extname(req.file.originalname);
      const newFilename = `${req.params.id}${ext}`;
      const oldPath = req.file.path;
      const newPath = path.join(path.dirname(oldPath), newFilename);

      // Renomear arquivo para usar o ID da orquídea
      fs.renameSync(oldPath, newPath);
      imagePath = `/images/orchids/${newFilename}`;

      // Gerar thumbnail
      await generateThumbnail(newPath);
    }

    // Atualizar DB
    const updateQuery = imagePath
      ? `UPDATE orchid SET description=?, genus_id=?, type_id=?, luminosity_id=?, temperature_id=?, humidity_id=?, size_id=?, image=? WHERE id=?`
      : `UPDATE orchid SET description=?, genus_id=?, type_id=?, luminosity_id=?, temperature_id=?, humidity_id=?, size_id=? WHERE id=?`;

    const params = imagePath
      ? [description, genus_id, type_id, luminosity_id, temperature_id, humidity_id, size_id, imagePath, req.params.id]
      : [description, genus_id, type_id, luminosity_id, temperature_id, humidity_id, size_id, req.params.id];

    const [result] = await pool.query(updateQuery, params);

    if (result.affectedRows === 0) return res.status(404).json({ error: "Orquídea não encontrada" });
    res.json({ success: true, image: imagePath });
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar orquídea", details: err.message });
  }
});

// DELETE /api/orchids/:id - Remover orquídea e sua imagem
router.delete("/:id", async (req, res) => {
  try {
    // Buscar orquídea para obter caminho da imagem
    const [rows] = await pool.query(`SELECT image FROM orchid WHERE id = ?`, [req.params.id]);

    if (rows.length === 0) return res.status(404).json({ error: "Orquídea não encontrada" });

    const imagePath = rows[0].image;

    // Deletar orquídea do DB
    const [result] = await pool.query(`DELETE FROM orchid WHERE id = ?`, [req.params.id]);

    // Deletar arquivo de imagem e thumbnail se existirem
    if (imagePath) {
      const fullImagePath = path.join(path.dirname(fileURLToPath(import.meta.url)), "../www", imagePath);
      const filename = path.basename(imagePath);
      const thumbPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "../www/images/orchids/thumbs", filename);

      deleteImageFile(fullImagePath);
      deleteThumbnailFile(thumbPath);
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Erro ao remover orquídea", details: err.message });
  }
});

export default router;
