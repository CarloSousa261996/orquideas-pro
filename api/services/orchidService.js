import { OrchidDAO } from "../dao/orchidDAO.js";

export class OrchidService {
  #orchidDAO;
  constructor() {
    this.#orchidDAO = new OrchidDAO();
  }

  /**
   * Retorna todas as orquídeas.
   * @returns {Promise<Array<Orchid>>} Uma promessa que resolve com um array de objetos Orchid.
   */
  async getAll() {
    return this.#orchidDAO.findAll();
  }

  /**
   * Retorna uma orquídea com base no seu ID.
   * @param {number} id - ID da orquídea.
   * @returns {Promise<Orchid | null>} Uma promessa que resolve com um objeto Orchid se a orquídea for encontrada, ou null caso contrário.
   */
  async getById(id) {
    return this.#orchidDAO.findById(id);
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
  async create(description, genus_id, type_id, luminosity_id, temperature_id, humidity_id, size_id, image = null) {
    const orchidExists = await this.#orchidDAO.findByDescription(description);
    if (orchidExists) {
      throw new Error("Orquídea com essa descrição já existe.");
    }
    const result = await this.#orchidDAO.create(description, genus_id, type_id, luminosity_id, temperature_id, humidity_id, size_id, image);
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
  async update(id, description, genus_id, type_id, luminosity_id, temperature_id, humidity_id, size_id, image = null) {
    const orchidExists = await this.#orchidDAO.findById(id);
    if (!orchidExists) {
      return false;
    }

    const duplicateOrchid = await this.#orchidDAO.findByDescription(description);
    if (duplicateOrchid && duplicateOrchid.id !== id) {
      throw new Error("Outra orquídea com essa descrição já existe.");
    }
    return this.#orchidDAO.update(id, description, genus_id, type_id, luminosity_id, temperature_id, humidity_id, size_id, image);
  }

  /**
   * Atualiza a imagem de uma orquídea com base no seu ID.
   * @param {number} id - ID da orquídea.
   * @param {string} imagePath - URL da imagem.
   * @returns {Promise<boolean>} Uma promessa que resolve com true se a imagem for atualizada com sucesso, ou false caso contrário.
   */
  async updateImage(id, imagePath) {
    const orchidExists = await this.#orchidDAO.findById(id);
    if (!orchidExists) {
      return false;
    }
    return this.#orchidDAO.updateImage(id, imagePath);
  }

  /**
   * Retorna a imagem de uma orquídea com base no seu ID.
   * @param {number} id - ID da orquídea.
   * @returns {Promise<string|null>} Uma promessa que resolve com a URL da imagem se a orquídea for encontrada, ou null caso contrário.
   */
  async getOrchidImage(id) {
    const orchid = await this.#orchidDAO.findById(id);
    return orchid ? orchid.image : null;
  }

  /**
   * Exclui uma orquídea com base no seu ID.
   * @param {number} id - ID da orquídea a ser excluída.
   * @returns {Promise<boolean>} Uma promessa que resolve com true se a orquídea for excluída com sucesso, ou false caso contrário.
   */
  async delete(id) {
    const orchidExists = await this.#orchidDAO.findById(id);
    if (!orchidExists) {
      return false;
    }
    return this.#orchidDAO.delete(id);
  }
}
