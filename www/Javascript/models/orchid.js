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

  constructor(id, description, genus, type, luminosity, temperature, humidity, size, src) {
    this.id = id;
    this.#description = description;
    this.genus = data.genus.find(({ id }) => id === genus);
    this.type = data.type.find(({ id }) => id === type);
    this.luminosity = data.luminosity.find(({ id }) => id === luminosity);
    this.temperature = data.temperature.find(({ id }) => id === temperature);
    this.humidity = data.humidity.find(({ id }) => id === humidity);
    this.size = data.size.find(({ id }) => id === size);
    this.#src = src;
  }

  get description() {
    return this.#description;
  }

  createLabel(characteristic) {
    const orchidCharacteristicLabel = document.createElement("span");
    orchidCharacteristicLabel.classList.add("label");
    orchidCharacteristicLabel.textContent = `${Orchid.characteristics[characteristic]}:`;
    return orchidCharacteristicLabel;
  }

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

  static getCharacteristicClass(characteristic, characteristicId) {
    if (!DATA_RESTORE[characteristic]) return "none";
    return `${characteristic}-${DATA_RESTORE[characteristic].find(({ id }) => id === characteristicId).description}`;
  }

  image() {
    const orchidPhoto = document.createElement("img");
    orchidPhoto.classList.add("orchid-photo");
    orchidPhoto.setAttribute("src", this.#src);

    return orchidPhoto;
  }

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
