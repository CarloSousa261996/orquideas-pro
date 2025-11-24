import { data } from "../data.js";
import { Orchid } from "../models/orchid.js";

export function CharacteristicPage() {
  const currentyCharacteristic = new URLSearchParams(location.search).get("characteristic") || "genus";
  const homeH1 = document.createElement("h1");
  homeH1.classList.add("name");

  const homeUl = document.createElement("ul");
  homeUl.classList.add("genus-list");

  Object.keys(Orchid.characteristics).forEach((characteristic) => {
    if (characteristic === currentyCharacteristic) {
      homeH1.textContent = Orchid.characteristics[characteristic];
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
          location.search = `${search}&characteristic-id=${item.id}`;
        });
        homeUl.appendChild(li);
      });
    }
  });
  const content = document.createElement("div");
  content.classList.add("content");

  content.appendChild(homeH1);
  content.appendChild(homeUl);
  return content;
}
