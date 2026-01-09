import pool from "../config/database.js";

// Query reutilizável com JOINs
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

export async function getAllOrchids() {
  const [rows] = await pool.query(ORCHID_SELECT_QUERY);
  return rows;
}

export async function getOrchidById(id) {
  const [rows] = await pool.query(ORCHID_SELECT_QUERY + " WHERE o.id = ?", [id]);
  return rows.length > 0 ? rows[0] : null;
}

export async function createOrchid(description, genus_id, type_id, luminosity_id, temperature_id, humidity_id, size_id, image = null) {
  const [result] = await pool.query(
    `INSERT INTO orchid (description, genus_id, type_id, luminosity_id, temperature_id, humidity_id, size_id, image)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [description, genus_id, type_id, luminosity_id, temperature_id, humidity_id, size_id, image]
  );
  return result.insertId;
}

export async function updateOrchid(id, description, genus_id, type_id, luminosity_id, temperature_id, humidity_id, size_id, image = null) {
  let query = `UPDATE orchid SET description=?, genus_id=?, type_id=?, luminosity_id=?, temperature_id=?, humidity_id=?, size_id=?`;
  let params = [description, genus_id, type_id, luminosity_id, temperature_id, humidity_id, size_id];

  if (image !== null) {
    query += `, image=?`;
    params.push(image);
  }

  query += ` WHERE id=?`;
  params.push(id);

  const [result] = await pool.query(query, params);
  return result.affectedRows > 0;
}

export async function updateOrchidImage(id, imagePath) {
  const [result] = await pool.query(`UPDATE orchid SET image=? WHERE id=?`, [imagePath, id]);
  return result.affectedRows > 0;
}

export async function getOrchidImage(id) {
  const [rows] = await pool.query(`SELECT image FROM orchid WHERE id = ?`, [id]);
  return rows.length > 0 ? rows[0].image : null;
}

export async function deleteOrchid(id) {
  const [result] = await pool.query(`DELETE FROM orchid WHERE id = ?`, [id]);
  return result.affectedRows > 0;
}
