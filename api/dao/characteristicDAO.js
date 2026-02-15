import pool from "../config/database.js";

export class CharacteristicDAO {
  async findAllByType(type) {
    const table = this.#getTableName(type);
    if (!table) return [];
    
    const [rows] = await pool.query(`SELECT id, description, name FROM ${table} ORDER BY description`);
    return rows;
  }

  async findAll() {
    const types = ['genus', 'type', 'luminosity', 'temperature', 'humidity', 'size'];
    const result = {};

    for (const type of types) {
      result[type] = await this.findAllByType(type);
    }

    return result;
  }

  #getTableName(type) {
    const validTypes = {
      'genus': 'genus',
      'type': 'type', 
      'luminosity': 'luminosity',
      'temperature': 'temperature',
      'humidity': 'humidity',
      'size': 'size'
    };
    
    return validTypes[type] || null;
  }
}