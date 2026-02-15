import { Content } from "../components/content.js";
import { getAllCharacteristics } from "../helper/characteristics.js";
import { navigateTo } from "../route.js";
import { fetchJson } from "../helper/fetch.js";

/**
 * Página de lista de orquídeas, filtrada por caractéristica
 * @param {String} [orchidCharacteristic=genus] Caractéristica de filtro
 * @param {Number} [orchidCharacteristicId=1] ID da caractéristica de filtro
 * @returns {Content} Página com lista de orquídeas e link de volta para a página de detalhes
 */
export async function OrchidPage() {
  const orchidCharacteristic = new URLSearchParams(location.search).get("characteristic") || "genus";
  const orchidCharacteristicId = parseInt(new URLSearchParams(location.search).get("characteristic-id")) || 1;

  try {
    const [allOrchids, characteristics] = await Promise.all([fetchJson("/api/orchids"), getAllCharacteristics()]);

    const characteristic = characteristics[orchidCharacteristic].find((genus) => genus.id === orchidCharacteristicId);
    const orchids = allOrchids.filter((orchid) => orchid[`${orchidCharacteristic}_id`] === orchidCharacteristicId);

    const orchidList = document.createElement("ul");
    orchidList.classList.add("orchid-list");

    orchids.forEach((item) => {
      const li = document.createElement("li");
      li.classList.add("orchid-item");
      const a = document.createElement("a");
      a.textContent = item.description;
      a.classList.add("orchid-link");
      li.appendChild(a);
      li.addEventListener("click", () => {
        navigateTo(`?orchid-id=${item.id}`);
      });
      orchidList.appendChild(li);
    });

    const genusLink = document.createElement("a");
    genusLink.textContent = characteristic.description;
    genusLink.classList.add("genera-back-link");
    return Content(characteristic.description, orchidList, genusLink);
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
    const errorDiv = document.createElement("div");
    errorDiv.textContent = "Erro ao carregar orquídeas";
    return Content("Erro", errorDiv);
  }
}
