import { Footer } from "./components/footer.js";
import { Header } from "./components/header.js";
import { CharacteristicPage } from "./pages/characteristic-list.js";
import { RegisterModal } from "./components/register-modal.js";

function init() {
  const main = document.createElement("main");
  main.classList.add("container");

  // criar header e mover o botão .menu-toggle para dentro dele
  const headerEl = Header();
  const menuToggle = document.querySelector(".menu-toggle");
  if (menuToggle) {
    // mover o botão para dentro do header (no topo direito)
    headerEl.insertBefore(menuToggle, headerEl.children[1] || null);
    // togglear classe para abrir/fechar menu
    menuToggle.addEventListener("click", () => {
      headerEl.classList.toggle("menu-open");
    });
  }

  main.appendChild(headerEl);
  main.appendChild(CharacteristicPage());
  main.appendChild(Footer());
  document.body.appendChild(main);

  // Adicionar modal de registro
  const registerModal = RegisterModal();
  registerModal.classList.add("hidden");
  document.body.appendChild(registerModal);

  // Função global para abrir modal
  window.openRegisterModal = () => {
    registerModal.classList.remove("hidden");
  };

  // ajustar comportamento ao redimensionar: fechar menu em desktop
  const handleResize = () => {
    if (window.innerWidth > 760) {
      headerEl.classList.remove("menu-open");
    }
  };

  window.addEventListener("resize", handleResize);
}

init();
