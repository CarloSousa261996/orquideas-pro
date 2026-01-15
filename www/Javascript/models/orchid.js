import { data } from "../data.js";

export class Orchid {
  #id;
  #description;
  #genus;
  #type;
  #luminosity;
  #temperature;
  #humidity;
  #size;
  #src;

  /**
   * Construtor da classe Orchid.
   * @param {number} id - ID da orquídea.
   * @param {string} description - Descrição da orquídea.
   * @param {number} genusId - ID do gênero.
   * @param {number} typeId - ID do tipo.
   * @param {number} luminosityId - ID da luminosidade.
   * @param {number} temperatureId - ID da temperatura.
   * @param {number} humidityId - ID da umidade.
   * @param {number} sizeId - ID do tamanho.
   * @param {string} src - URL da imagem.
   * @param {object} apiData - Dados opcionais da resposta da API.
   */
  constructor(id, description, genusId, typeId, luminosityId, temperatureId, humidityId, sizeId, src, apiData = null) {
    this.id = id;
    this.#description = description;

    // If apiData is provided (from API response), use it directly
    if (apiData) {
      this.genus = { id: genusId, description: apiData.genus };
      this.type = { id: typeId, description: apiData.type };
      this.luminosity = { id: luminosityId, description: apiData.luminosity };
      this.temperature = { id: temperatureId, description: apiData.temperature };
      this.humidity = { id: humidityId, description: apiData.humidity };
      this.size = { id: sizeId, description: apiData.size };
    } else {
      // Fallback to data.js for backward compatibility
      this.genus = data.genus.find(({ id }) => id === genusId);
      this.type = data.type.find(({ id }) => id === typeId);
      this.luminosity = data.luminosity.find(({ id }) => id === luminosityId);
      this.temperature = data.temperature.find(({ id }) => id === temperatureId);
      this.humidity = data.humidity.find(({ id }) => id === humidityId);
      this.size = data.size.find(({ id }) => id === sizeId);
    }
    this.#src = src;
  }

  /**
   * Retorna a descrição da orquídea.
   * @returns {string} A descrição da orquídea.
   */
  get description() {
    return this.#description;
  }

  /**
   * Cria um elemento de rótulo para uma característica da orquídea.
   * @param {string} characteristic - O nome da característica.
   * @returns {HTMLSpanElement} Um elemento de rótulo para a característica fornecida.
   */
  createLabel(characteristic) {
    const orchidCharacteristicLabel = document.createElement("span");
    orchidCharacteristicLabel.classList.add("label");
    orchidCharacteristicLabel.textContent = `${Orchid.characteristics[characteristic]}:`;
    return orchidCharacteristicLabel;
  }

  /**
   * Cria um elemento de valor para uma característica da orquídea.
   * @param {string} characteristic - O nome da característica.
   * @returns {HTMLSpanElement} Um elemento de valor para a característica fornecida.
   * O elemento terá a classe do nome da característica e se a característica
   * estiver presente em DATA_RESTORE, também terá a classe do nome da característica seguida
   * pela descrição da característica.
   */
  createValue(characteristic) {
    const orchidCharacteristicValue = document.createElement("span");
    orchidCharacteristicValue.textContent = this[characteristic].description;

    if (DATA_RESTORE[characteristic]) {
      orchidCharacteristicValue.classList.add(`${characteristic}-${DATA_RESTORE[characteristic].find(({ id }) => id === this[characteristic].id).description}`);
    }

    orchidCharacteristicValue.classList.add(characteristic);
    orchidCharacteristicValue.classList.add(characteristic);
    return orchidCharacteristicValue;
  }

/**
 * Retorna um nome de classe CSS que representa uma característica da orquídea.
 * O nome da classe está no formato "{característica}-{descrição}".
 * Se a característica não for encontrada em DATA_RESTORE, retorna "none".
 * @param {string} characteristic - O nome da característica.
 * @param {number} characteristicId - O ID da característica.
 * @returns {string} Um nome de classe CSS que representa uma característica da orquídea.
 */
  static getCharacteristicClass(characteristic, characteristicId) {
    if (!DATA_RESTORE[characteristic]) return "none";
    return `${characteristic}-${DATA_RESTORE[characteristic].find(({ id }) => id === characteristicId).description}`;
  }

  /**
   * Retorna um elemento HTML img com a classe "orchid-photo" e o atributo src definido para o valor da propriedade "#src".
   * @returns {HTMLImageElement} Um elemento HTML img com a classe "orchid-photo" e o atributo src definido para o valor da propriedade "#src".
   */
  image() {
    const orchidPhoto = document.createElement("img");
    orchidPhoto.classList.add("orchid-photo");
    orchidPhoto.setAttribute("src", this.#src);

    return orchidPhoto;
  }

  /**
   * Retorna um objeto com as características da orquídea como chaves e seus nomes como valores.
   * As características são:
   * - genus: Gênero
   * - type: Tipo
   * - luminosity: Luminosidade
   * - temperature: Temperatura
   * - humidity: Humidade
   * - size: Tamanho
   * @returns {Object} Um objeto com as características da orquídea como chaves e seus nomes como valores.
   */
  static get characteristics() {
    return {
      genus: "Género",
      type: "Tipo",
      luminosity: "Luminosidade",
      temperature: "Temperatura",
      humidity: "Humidade",
      size: "Tamanho",
    };
  }
}

const DATA_RESTORE = {
  type: [
    { id: 1, description: "species" },
    { id: 2, description: "hybrid" },
  ],
  luminosity: [
    { id: 1, description: "full-shade" },
    { id: 2, description: "shaded-light" },
    { id: 3, description: "filtered-light" },
    { id: 4, description: "strong-light" },
  ],
  temperature: [
    { id: 1, description: "cold" },
    { id: 2, description: "seasoned" },
    { id: 3, description: "hot" },
    { id: 4, description: "very-hot" },
  ],
  humidity: [
    { id: 1, description: "lt40" },
    { id: 2, description: "40-60" },
    { id: 3, description: "60-80" },
    { id: 4, description: "gt80" },
  ],
  size: [
    { id: 1, description: "miniature" },
    { id: 2, description: "small" },
    { id: 3, description: "medium" },
    { id: 4, description: "big" },
  ],
};
