import { data } from "./data.js";

const genusId = 1;

const genus = data.genus.find((genus) => genus.id === genusId);
const orchids = data.orchid.filter((orchid) => orchid.genus === genusId);

const h1 = document.createElement("h1");
h1.textContent = genus.description;
h1.classList.add("name");

const orchidList = document.createElement("ul");
orchidList.classList.add("orchid-list");

orchids.forEach((item) => {
  const li = document.createElement("li");
  li.classList.add("orchid-item");
  const a = document.createElement("a");
  a.textContent = item.description;
  a.classList.add("orchid-link");
  li.appendChild(a);
  orchidList.appendChild(li);
});

const genusLink = document.createElement("a");
genusLink.textContent = "Géneros";
genusLink.classList.add("genera-back-link");

const footer = document.createElement("footer");
const footerLink = document.createElement("a");

footerLink.textContent =
  "About &copy; Tecnologia Setúbal &bull; Programação Web";
footerLink.classList.add("about-link");

footer.appendChild(footerLink);

export function OrchidPage() {
  document.body.appendChild(h1);
  document.body.appendChild(orchidList);
  document.body.appendChild(genusLink);
  document.body.appendChild(footer);
}
