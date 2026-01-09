import { Footer } from "./components/footer.js";
import { Header } from "./components/header.js";
import { CharacteristicPage } from "./pages/characteristic-list.js";
import { RegisterModal } from "./components/register-modal.js";

function init() {
  const main = document.createElement("main");
  main.classList.add("container");

  const headerEl = Header();
  const menuToggle = document.querySelector(".menu-toggle");
  if (menuToggle) {
    headerEl.insertBefore(menuToggle, headerEl.children[1] || null);
    menuToggle.addEventListener("click", () => {
      headerEl.classList.toggle("menu-open");
    });
  }

  main.appendChild(headerEl);
  main.appendChild(CharacteristicPage());
  main.appendChild(Footer());
  document.body.appendChild(main);

  const registerModal = RegisterModal();
  registerModal.classList.add("hidden");
  document.body.appendChild(registerModal);

  window.openRegisterModal = () => {
    registerModal.classList.remove("hidden");
  };

  const handleResize = () => {
    if (window.innerWidth > 760) {
      headerEl.classList.remove("menu-open");
    }
  };

  window.addEventListener("resize", handleResize);
}

init();
