import { Content } from "../components/content.js";
import { data } from "../data.js";
import { navigateTo } from "../route.js";

/**
 * Página de lista de orquídeas, filtrada por caractéristica
 * @param {String} [orchidCharacteristic=genus] Caractéristica de filtro
 * @param {Number} [orchidCharacteristicId=1] ID da caractéristica de filtro
 * @returns {Content} Página com lista de orquídeas e link de volta para a página de detalhes
 */
export function OrchidPage() {
  const orchidCharacteristic = new URLSearchParams(location.search).get("characteristic") || "genus";
  const orchidCharacteristicId = parseInt(new URLSearchParams(location.search).get("characteristic-id")) || 1;

  const characteristic = data[orchidCharacteristic].find((genus) => genus.id === orchidCharacteristicId);
  const orchids = data.orchid.filter((orchid) => orchid.genus === orchidCharacteristicId);

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
}
