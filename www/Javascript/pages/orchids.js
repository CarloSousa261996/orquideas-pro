import { Content } from "../components/content.js";
import { data } from "../data.js";

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
    location.search = `?orchid-id=${item.id}`;
  });
  orchidList.appendChild(li);
});

const genusLink = document.createElement("a");
genusLink.textContent = characteristic.description;
genusLink.classList.add("genera-back-link");

const footer = document.createElement("footer");
const footerLink = document.createElement("a");

footerLink.textContent = "About &copy; Tecnologia Setúbal &bull; Programação Web";
footerLink.classList.add("about-link");

footer.appendChild(footerLink);

export function OrchidPage() {
  const content = Content(characteristic.description, orchidList);
  content.appendChild(genusLink);
  content.appendChild(footer);
  return content;
}
