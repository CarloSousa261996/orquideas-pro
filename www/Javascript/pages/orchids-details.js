"use strict";
import { Content } from "../components/content.js";
import { fetchJson } from "../helper/fetch.js";
import { Orchid } from "../models/orchid.js";

/**
 * Renderiza a página com detalhes de uma orquídea.
 * @returns {Promise<Content>} Uma promessa que resolve com um objeto Content representando a página com detalhes de uma orquídea.
 */
export async function OrchidDetailsPage() {
  const orchidId = new URLSearchParams(location.search).get("orchid-id") || "1";
  const orchidData = await fetchJson(`/api/orchids/${orchidId}`);

  if (!orchidData) alert("Orquidia não encontrada!");

  const orchid = new Orchid(
    orchidData.id,
    orchidData.description,
    orchidData.genus_id,
    orchidData.type_id,
    orchidData.luminosity_id,
    orchidData.temperature_id,
    orchidData.humidity_id,
    orchidData.size_id,
    orchidData.image
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

  orchidInfoSection.appendChild(orchid.image());
  orchidInfoSection.appendChild(orchidCharacteristics);

  return Content(orchid.description, orchidInfoSection);
}
