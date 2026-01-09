import express from "express";
import pool from "../api/config/database.js";

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

// POST /api/orchids - Criar nova orquídea
router.post("/", async (req, res) => {
  try {
    const { nome, genero_id, tipo_id, luminosidade_id, temperatura_id, humidade_id, tamanho_id, descricao, imagem } = req.body;
    const [result] = await pool.query(
      `INSERT INTO orquidea (nome, genero_id, tipo_id, luminosidade_id, temperatura_id, humidade_id, tamanho_id, descricao, imagem)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [nome, genero_id, tipo_id, luminosidade_id, temperatura_id, humidade_id, tamanho_id, descricao, imagem || null]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar orquídea", details: err.message });
  }
});

// PUT /api/orchids/:id - Atualizar orquídea
router.put("/:id", async (req, res) => {
  try {
    const { description, genus_id, type_id, luminosity_id, temperature_id, humidity_id, size_id, image } = req.body;
    const [result] = await pool.query(`UPDATE orchid SET description=?, genus_id=?, type_id=?, luminosity_id=?, temperature_id=?, humidity_id=?, size_id=?, image=? WHERE id=?`, [
      description,
      genus_id,
      type_id,
      luminosity_id,
      temperature_id,
      humidity_id,
      size_id,
      image || null,
      req.params.id,
    ]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Orquídea não encontrada" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar orquídea", details: err.message });
  }
});

// DELETE /api/orchids/:id - Remover orquídea
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await pool.query(`DELETE FROM orchid WHERE id = ?`, [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Orquídea não encontrada" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Erro ao remover orquídea", details: err.message });
  }
});

export default router;
