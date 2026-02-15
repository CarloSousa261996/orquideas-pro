import pool from "../config/database.js";

const ORCHID_SELECT_QUERY = `
  SELECT 
    o.id, 
    o.description, 
    o.image, 
    g.id as genus_id, 
    g.description AS genus_description, 
    g.name AS genus_name,
    t.id as type_id, 
    t.description AS type_description, 
    t.name AS type_name,
    l.id as luminosity_id, 
    l.description AS luminosity_description, 
    l.name AS luminosity_name,
    te.id as temperature_id, 
    te.description AS temperature_description, 
    te.name AS temperature_name,
    h.id as humidity_id, 
    h.description AS humidity_description, 
    h.name AS humidity_name,
    s.id as size_id, 
    s.description AS size_description,
    s.name AS size_name
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
    return rows.map(this.#toOrchidDTO);
  }

  async findById(id) {
    const [rows] = await pool.query(ORCHID_SELECT_QUERY + " WHERE o.id = ?", [id]);
    return rows.length > 0 ? this.#toOrchidDTO(rows[0]) : null;
  }

  async create(description, genus_id, type_id, luminosity_id, temperature_id, humidity_id, size_id, image = null) {
    const [result] = await pool.query(
      `INSERT INTO orchid (description, genus_id, type_id, luminosity_id, temperature_id, humidity_id, size_id, image)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [description, genus_id, type_id, luminosity_id, temperature_id, humidity_id, size_id, image],
    );
    return result.insertId;
  }

  async update(id, description, genus_id, type_id, luminosity_id, temperature_id, humidity_id, size_id, image = null) {
    const [result] = await pool.query(
      `UPDATE orchid 
       SET description=?, genus_id=?, type_id=?, luminosity_id=?, temperature_id=?, humidity_id=?, size_id=?, image=?
       WHERE id=?`,
      [description, genus_id, type_id, luminosity_id, temperature_id, humidity_id, size_id, image, id],
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

  #toOrchidDTO(row) {
    return Object.keys(row).reduce((dto, key) => {
      const [entity, field] = key.split("_");
      if (key.split("_").length === 2) {
        dto[entity] = {
          ...dto[entity],
          [field]: row[key],
        };
        return dto;
      }
      dto[key] = row[key];
      return dto;
    }, {});
  }
}
