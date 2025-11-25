import { Content } from "../components/content.js";
import { data } from "../data.js";
import { Orchid } from "../models/orchid.js";
import { navigateTo } from "../route.js";

export function CharacteristicPage() {
  const currentyCharacteristic = new URLSearchParams(location.search).get("characteristic") || "genus";

  const homeUl = document.createElement("ul");
  homeUl.classList.add("genus-list");

  Object.keys(Orchid.characteristics).forEach((characteristic) => {
    if (characteristic === currentyCharacteristic) {
      data[currentyCharacteristic].forEach((item) => {
        const li = document.createElement("li");
        li.classList.add("genus-item");

        const a = document.createElement("a");
        a.textContent = item.description;
        a.classList.add("genus-link");
        a.classList.add(Orchid.getCharacteristicClass(currentyCharacteristic, item.id));

        if (currentyCharacteristic === "genus") {
          a.setAttribute("id", item.description.toLocaleLowerCase());
        }

        li.appendChild(a);
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
