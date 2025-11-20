"use strict";
import { data } from "./data.js";

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

// Selecting the orchid with index 5 from the data
const orchidData = data.orchid[5];

/**
 * Creating the HTML structure for the orchid details page
 * @returns {void}
 *
 */
const h1 = document.createElement("h1");
h1.classList.add("name");
h1.textContent = orchidData.description;

const orchidInfoSection = document.createElement("section");
orchidInfoSection.classList.add("orchid-info");

const orchidCharacteristics = document.createElement("div");
orchidCharacteristics.classList.add("characteristics");

const CHARACTERISTICS = {
  genus: "Género",
  type: "Tipo",
  luminosity: "Luminosidade",
  temperature: "Temperatura",
  humidity: "Humidade",
  size: "Tamanho",
};

Object.keys(CHARACTERISTICS).forEach((characteristic) => {
  const orchidCharacteristic = document.createElement("div");
  orchidCharacteristic.classList.add("characteristic");

  const orchidCharacteristicLabel = document.createElement("span");
  orchidCharacteristicLabel.classList.add("label");
  orchidCharacteristicLabel.textContent = `${CHARACTERISTICS[characteristic]}:`;

  const orchidCharacteristicValue = document.createElement("span");
  orchidCharacteristicValue.textContent = data[characteristic].find(({ id }) => id === orchidData[characteristic]).description;

  orchidCharacteristicValue.classList.add(characteristic);
  orchidCharacteristicValue.classList.add(characteristic);

  if (DATA_RESTORE[characteristic]) {
    orchidCharacteristicValue.classList.add(`${characteristic}-${DATA_RESTORE[characteristic].find(({ id }) => id === orchidData[characteristic]).description}`);
  }

  orchidCharacteristic.appendChild(orchidCharacteristicLabel);
  orchidCharacteristic.appendChild(orchidCharacteristicValue);

  orchidCharacteristics.appendChild(orchidCharacteristic);
});

const orchidPhoto = document.createElement("img");
orchidPhoto.classList.add("orchid-photo");
orchidPhoto.setAttribute("src", orchidData.src);

orchidInfoSection.appendChild(orchidCharacteristics);
orchidInfoSection.appendChild(orchidPhoto);

export function OrchidDetailsPage() {
  document.body.appendChild(h1);
  document.body.appendChild(orchidInfoSection);
}
