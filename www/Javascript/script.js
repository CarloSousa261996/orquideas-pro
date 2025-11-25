import { Header } from "./components/header.js";
import { CharacteristicPage } from "./pages/characteristic-list.js";
import { OrchidDetailsPage } from "./pages/orchids-details.js";
import { OrchidPage } from "./pages/orchids.js";

function init() {
  const main = document.createElement("main");
  main.classList.add("container");
  main.appendChild(Header());
  const content = CharacteristicPage();

  main.appendChild(content);
  document.body.appendChild(main);
  //OrchidDetailsPage();

  const currentyContent = main.getElementsByClassName("content")[0];

  if (new URLSearchParams(location.search).get("characteristic-id")) {
    main.replaceChild(OrchidPage(), currentyContent);
  }

  if (new URLSearchParams(location.search).get("orchid-id")) {
    main.replaceChild(OrchidDetailsPage(), currentyContent);
  }
}

init();
