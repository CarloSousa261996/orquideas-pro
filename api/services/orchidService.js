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

/**
 * Retorna todas as orquídeas.
 * @returns {Promise<Array<Orchid>>} Uma promessa que resolve com um array de objetos Orchid.
 */
export async function getAllOrchids() {
  const [rows] = await pool.query(ORCHID_SELECT_QUERY);
  return rows;
}

/**
 * Retorna uma orquídea com base no seu ID.
 * @param {number} id - ID da orquídea.
 * @returns {Promise<Orchid | null>} Uma promessa que resolve com um objeto Orchid se a orquídea for encontrada, ou null caso contrário.
*/
export async function getOrchidById(id) {
  const [rows] = await pool.query(ORCHID_SELECT_QUERY + " WHERE o.id = ?", [id]);
  return rows.length > 0 ? rows[0] : null;
}

/**
 * Cria uma nova orquídea.
 * @param {string} description - Descrição da orquídea.
 * @param {number} genus_id - ID do gênero.
 * @param {number} type_id - ID do tipo.
 * @param {number} luminosity_id - ID da luminosidade.
 * @param {number} temperature_id - ID da temperatura.
 * @param {number} humidity_id - ID da umidade.
 * @param {number} size_id - ID do tamanho.
 * @param {string|null} image - URL da imagem (opcional).
 * @returns {Promise<number>} Uma promessa que resolve com o ID da orquídea criada.
 */
export async function createOrchid(description, genus_id, type_id, luminosity_id, temperature_id, humidity_id, size_id, image = null) {
  const [result] = await pool.query(
    `INSERT INTO orchid (description, genus_id, type_id, luminosity_id, temperature_id, humidity_id, size_id, image)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [description, genus_id, type_id, luminosity_id, temperature_id, humidity_id, size_id, image]
  );
  return result.insertId;
}

/**
 * Atualiza uma orquídea com base no seu ID.
 * @param {number} id - ID da orquídea.
 * @param {string} description - Descrição da orquídea.
 * @param {number} genus_id - ID do gênero.
 * @param {number} type_id - ID do tipo.
 * @param {number} luminosity_id - ID da luminosidade.
 * @param {number} temperature_id - ID da temperatura.
 * @param {number} humidity_id - ID da umidade.
 * @param {number} size_id - ID do tamanho.
 * @param {string|null} image - URL da imagem (opcional).
 * @returns {Promise<boolean>} Uma promessa que resolve com true se a orquídea for atualizada com sucesso, ou false caso contrário.
 */
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

/**
 * Atualiza a imagem de uma orquídea com base no seu ID.
 * @param {number} id - ID da orquídea.
 * @param {string} imagePath - URL da imagem.
 * @returns {Promise<boolean>} Uma promessa que resolve com true se a imagem for atualizada com sucesso, ou false caso contrário.
 */
export async function updateOrchidImage(id, imagePath) {
  const [result] = await pool.query(`UPDATE orchid SET image=? WHERE id=?`, [imagePath, id]);
  return result.affectedRows > 0;
}

/**
 * Retorna a imagem de uma orquídea com base no seu ID.
 * @param {number} id - ID da orquídea.
 * @returns {Promise<string|null>} Uma promessa que resolve com a URL da imagem se a orquídea for encontrada, ou null caso contrário.
 */
export async function getOrchidImage(id) {
  const [rows] = await pool.query(`SELECT image FROM orchid WHERE id = ?`, [id]);
  return rows.length > 0 ? rows[0].image : null;
}

/**
 * Exclui uma orquídea com base no seu ID.
 * @param {number} id - ID da orquídea a ser excluída.
 * @returns {Promise<boolean>} Uma promessa que resolve com true se a orquídea for excluída com sucesso, ou false caso contrário.
 */
export async function deleteOrchid(id) {
  const [result] = await pool.query(`DELETE FROM orchid WHERE id = ?`, [id]);
  return result.affectedRows > 0;
}
