import { Footer } from "./components/footer.js";
import { Header } from "./components/header.js";
import { CharacteristicPage } from "./pages/characteristic-list.js";

function init() {
  const main = document.createElement("main");
  main.classList.add("container");
  main.appendChild(Header());
  main.appendChild(CharacteristicPage());
  main.appendChild(Footer());
  document.body.appendChild(main);
}

init();
