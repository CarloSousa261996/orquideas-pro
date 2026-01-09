import express from "express";
import pool from "../config/database.js";

const router = express.Router();

// GET /api/orchids - Lista todas as orquídeas
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT o.*, g.nome as genero, t.nome as tipo, l.descricao as luminosidade, te.descricao as temperatura, h.descricao as humidade, ta.descricao as tamanho
      FROM orquidea o
      JOIN genero g ON o.genero_id = g.id
      JOIN tipo t ON o.tipo_id = t.id
      JOIN luminosidade l ON o.luminosidade_id = l.id
      JOIN temperatura te ON o.temperatura_id = te.id
      JOIN humidade h ON o.humidade_id = h.id
      JOIN tamanho ta ON o.tamanho_id = ta.id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar orquídeas", details: err.message });
  }
});

export default router;
