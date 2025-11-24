import { Header } from "./components/header.js";
import { data } from "./data.js";
import { Orchid } from "./models/orchid.js";
import { OrchidDetailsPage } from "./pages/orchids-details.js";
import { OrchidPage } from "./pages/orchids.js";

const currentyCharacteristic = "luminosity";
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
      homeUl.appendChild(li);
    });
  }
});

function init() {
  const main = document.createElement("main");
  main.classList.add("container");
  main.appendChild(Header());
  main.appendChild(homeH1);
  main.appendChild(homeUl);
  document.body.appendChild(main);
  //OrchidDetailsPage();
  //OrchidPage();
}

init();
