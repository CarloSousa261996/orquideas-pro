import pool from "../config/database.js";

const ORCHID_SELECT_QUERY = `
  SELECT o.*, g.description as genus, t.description as type, l.description as luminosity, 
         te.description as temperature, h.description as humidity, s.description as size
  FROM orchid o
  JOIN genus g ON o.genus_id = g.id
  JOIN type t ON o.type_id = t.id
  JOIN luminosity l ON o.luminosity_id = l.id
  JOIN temperature te ON o.temperature_id = te.id
  JOIN humidity h ON o.humidity_id = h.id
  JOIN size s ON o.size_id = s.id
`;

export class OrchidDAO {
  async findAll() {
    const [rows] = await pool.query(ORCHID_SELECT_QUERY);
    return rows;
  }

  async findById(id) {
    const [rows] = await pool.query(ORCHID_SELECT_QUERY + " WHERE o.id = ?", [id]);
    return rows.length > 0 ? rows[0] : null;
  }

  async create(description, genus_id, type_id, luminosity_id, temperature_id, humidity_id, size_id, image = null) {
    const [result] = await pool.query(
      `INSERT INTO orchid (description, genus_id, type_id, luminosity_id, temperature_id, humidity_id, size_id, image)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [description, genus_id, type_id, luminosity_id, temperature_id, humidity_id, size_id, image]
    );
    return result.insertId;
  }

  async update(id, description, genus_id, type_id, luminosity_id, temperature_id, humidity_id, size_id, image = null) {
    const [result] = await pool.query(
      `UPDATE orchid 
       SET description=?, genus_id=?, type_id=?, luminosity_id=?, temperature_id=?, humidity_id=?, size_id=?, image=?
       WHERE id=?`,
      [description, genus_id, type_id, luminosity_id, temperature_id, humidity_id, size_id, image, id]
    );
    return result.affectedRows > 0;
  }

  async delete(id) {
    const [result] = await pool.query(`DELETE FROM orchid WHERE id = ?`, [id]);
    return result.affectedRows > 0;
  }

  async updateImage(id, imagePath) {
    const [result] = await pool.query(`UPDATE orchid SET image=? WHERE id=?`, [imagePath, id]);
    return result.affectedRows > 0;
  }
}
