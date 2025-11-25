"use strict";
import { Content } from "../components/content.js";
import { data } from "../data.js";
import { Orchid } from "../models/orchid.js";

export function OrchidDetailsPage() {
  const orchidId = new URLSearchParams(location.search).get("orchid-id") || "1";
  const orchidData = data.orchid.find((orchid) => orchid.id === parseInt(orchidId));

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

  return Content(orchid.description, orchidInfoSection);
}
