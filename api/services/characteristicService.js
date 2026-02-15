import { CharacteristicDAO } from "../dao/characteristicDAO.js";

export class CharacteristicService {
  #characteristicDAO;

  constructor() {
    this.#characteristicDAO = new CharacteristicDAO();
  }

  /**
   * Retorna todas as características agrupadas por tipo.
   * @returns {Promise<Object>} Uma promessa que resolve com um objeto contendo arrays de características por tipo.
   */
  async getAllCharacteristics() {
    return this.#characteristicDAO.findAll();
  }

  /**
   * Retorna características de um tipo específico.
   * @param {string} type - Tipo da característica (genus, type, luminosity, temperature, humidity, size).
   * @returns {Promise<Array>} Uma promessa que resolve com um array de características do tipo especificado.
   */
  async getCharacteristicsByType(type) {
    return this.#characteristicDAO.findAllByType(type);
  }
}
