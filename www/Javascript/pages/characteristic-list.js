import { Content } from "../components/content.js";
import { data } from "../data.js";
import { Orchid } from "../models/orchid.js";
import { navigateTo } from "../route.js";

/**
 * Renderiza a página com a lista de características de orquídeas.
 * A característica a ser renderizada é determinada pela query string "characteristic".
 * Se a característica for "genus", cada item da lista recebe um ID único com base na descri o da orquídea em lower case.
 * Cada item da lista é um link que navega para a página com a lista de orquídeas que possuem a característica específica.
 * @returns {Promise<Content>} - Uma promessa que resolve com um objeto Content representando a página com a lista de características de orquídeas.
 */
export function CharacteristicPage() {
  const currentyCharacteristic = new URLSearchParams(location.search).get("characteristic") || "genus";

  const homeUl = document.createElement("ul");
  homeUl.classList.add("genus-list");

  Object.keys(Orchid.characteristics).forEach((characteristic) => {
    if (characteristic === currentyCharacteristic) {
      data[currentyCharacteristic].forEach((item) => {
        const li = document.createElement("li");
        li.classList.add("genus-item");

        const descriptionEl = document.createElement("p");
        descriptionEl.textContent = item.description;
        li.classList.add("genus-link");
        li.classList.add(Orchid.getCharacteristicClass(currentyCharacteristic, item.id));

        if (currentyCharacteristic === "genus") {
          li.setAttribute("id", item.description.toLocaleLowerCase());
        }

        li.appendChild(descriptionEl);
        li.addEventListener("click", () => {
          const search = `?characteristic=${currentyCharacteristic}`;
          navigateTo(`${search}&characteristic-id=${item.id}`);
        });
        homeUl.appendChild(li);
      });
    }
  });

  return Content(Orchid.characteristics[currentyCharacteristic], homeUl);
}
