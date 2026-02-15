export class Characteristic {
  #id;
  #description;
  #name;
  constructor(id, description, name) {
    this.#id = id;
    this.#description = description;
    this.#name = name;
  }

  get id() {
    return this.#id;
  }

  get description() {
    return this.#description;
  }

  getClass(characteristicId) {
    if (this.#name === "genus") return "none";
    return `${this.#name}-${DATA_RESTORE[characteristic].find(({ id }) => id === characteristicId).description}`;
  }
}
