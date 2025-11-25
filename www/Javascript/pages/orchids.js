import { data } from "../data.js";

const orchidCharacteristic = new URLSearchParams(location.search).get("characteristic") || "genus";
const orchidCharacteristicId = parseInt(new URLSearchParams(location.search).get("characteristic-id")) || 1;

/**
 * Creating the HTML structure for the genus page
 * @returns {void}
 * /
 */
const characteristic = data[orchidCharacteristic].find((genus) => genus.id === orchidCharacteristicId);
const orchids = data.orchid.filter((orchid) => orchid.genus === orchidCharacteristicId);

// Create and set h1 for genus name
const h1 = document.createElement("h1");
h1.textContent = characteristic.description;
h1.classList.add("name");

// Create orchid list
const orchidList = document.createElement("ul");
// Add class to orchid list
orchidList.classList.add("orchid-list");

// Populate orchid list
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

/**
 * Creating the back link to genera page
 * @returns {void}
 * /
 */
const genusLink = document.createElement("a");
genusLink.textContent = characteristic.description;
genusLink.classList.add("genera-back-link");

const footer = document.createElement("footer");
const footerLink = document.createElement("a");

footerLink.textContent = "About &copy; Tecnologia Setúbal &bull; Programação Web";
footerLink.classList.add("about-link");

footer.appendChild(footerLink);

export function OrchidPage() {
  const content = document.createElement("div");
  content.classList.add("content");
  content.appendChild(h1);
  content.appendChild(orchidList);
  content.appendChild(genusLink);
  content.appendChild(footer);
  return content;
}
