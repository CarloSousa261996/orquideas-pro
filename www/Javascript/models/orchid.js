import { Characteristic } from "./characteristic.js";
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
  constructor(id, description, genus, type, luminosity, temperature, humidity, size, src) {
    this.#id = id;
    this.#description = description;
    this.#genus = Orchid.#toCharacteristic(genus);
    this.#type = Orchid.#toCharacteristic(type);
    this.#luminosity = Orchid.#toCharacteristic(luminosity);
    this.#temperature = Orchid.#toCharacteristic(temperature);
    this.#humidity = Orchid.#toCharacteristic(humidity);
    this.#size = Orchid.#toCharacteristic(size);
    this.#src = src;
  }

  static #toCharacteristic(value) {
    if (!value) return new Characteristic(null, "", null);
    if (Array.isArray(value)) return new Characteristic(...value);
    if (typeof value === "object") return new Characteristic(value.id, value.description, value.name ?? null);
    return new Characteristic(value, "", null);
  }

  /**
   * Retorna a descrição da orquídea.
   * @returns {string} A descrição da orquídea.
   */
  get description() {
    return this.#description;
  }

  get genus() {
    return this.#genus;
  }

  get type() {
    return this.#type;
  }

  get luminosity() {
    return this.#luminosity;
  }

  get temperature() {
    return this.#temperature;
  }

  get humidity() {
    return this.#humidity;
  }

  get size() {
    return this.#size;
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

    const characteristicName = this[characteristic].name || Orchid.getCharacteristicName(characteristic, this[characteristic].id);

    if (characteristicName) {
      orchidCharacteristicValue.classList.add(`${characteristic}-${characteristicName}`);
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
    const characteristicName = Orchid.getCharacteristicName(characteristic, characteristicId);
    if (!characteristicName) return "none";
    return `${characteristic}-${characteristicName}`;
  }

  static getCharacteristicName(characteristic, characteristicId) {
    if (!DATA_RESTORE[characteristic]) return null;
    return DATA_RESTORE[characteristic].find(({ id }) => id === characteristicId)?.name || null;
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
    { id: 1, name: "species" },
    { id: 2, name: "hybrid" },
  ],
  luminosity: [
    { id: 1, name: "full-shade" },
    { id: 2, name: "shaded-light" },
    { id: 3, name: "filtered-light" },
    { id: 4, name: "strong-light" },
  ],
  temperature: [
    { id: 1, name: "cold" },
    { id: 2, name: "seasoned" },
    { id: 3, name: "hot" },
    { id: 4, name: "very-hot" },
  ],
  humidity: [
    { id: 1, name: "lt40" },
    { id: 2, name: "40-60" },
    { id: 3, name: "60-80" },
    { id: 4, name: "gt80" },
  ],
  size: [
    { id: 1, name: "miniature" },
    { id: 2, name: "small" },
    { id: 3, name: "medium" },
    { id: 4, name: "big" },
  ],
};
