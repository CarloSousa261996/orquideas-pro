"use strict";
import { data } from "../data.js";
import { Orchid } from "../models/orchid.js";

const orchidData = data.orchid[2];

const orchid = new Orchid(
  orchidData.id,
  orchidData.description,
  orchidData.genus,
  orchidData.type,
  orchidData.luminosity,
  orchidData.temperature,
  orchidData.humidity,
  orchidData.size,
  orchidData.src
);

const h1 = document.createElement("h1");
h1.classList.add("name");
h1.textContent = orchid.description;

const orchidInfoSection = document.createElement("section");
orchidInfoSection.classList.add("orchid-info");

const orchidCharacteristics = document.createElement("div");
orchidCharacteristics.classList.add("characteristics");

Object.keys(Orchid.characteristics).forEach((characteristic) => {
  const orchidCharacteristic = document.createElement("div");
  orchidCharacteristic.classList.add("characteristic");

  const orchidCharacteristicLabel = orchid.createLabel(characteristic);
  const orchidCharacteristicValue = orchid.createValue(characteristic);

  orchidCharacteristic.appendChild(orchidCharacteristicLabel);
  orchidCharacteristic.appendChild(orchidCharacteristicValue);

  orchidCharacteristics.appendChild(orchidCharacteristic);
});

orchidInfoSection.appendChild(orchidCharacteristics);
orchidInfoSection.appendChild(orchid.image());

export function OrchidDetailsPage() {
  document.body.appendChild(h1);
  document.body.appendChild(orchidInfoSection);
}
