import { Footer } from "./components/footer.js";
import { Header } from "./components/header.js";
import { CharacteristicPage } from "./pages/characteristic-list.js";
import { RegisterModal } from "./components/register-modal.js";

/**
 * Inicializa a página web com um header, um main
 * container que contém a página de características e um
 * footer, e configura o evento de clique no menu
 * toggle para alternar a visibilidade do menu.
 * Adiciona o modal de registro à página e configura
 * o evento de clique para abrir/fechar o modal.
 * Adiciona o evento de resize para fechar o menu
 * quando a janela tem mais de 760px de largura.
 */
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

/**
 * Abre o modal de registro.
 * 
 * @function openRegisterModal
 * @example
 * window.openRegisterModal();
 */
  window.openRegisterModal = () => {
    registerModal.classList.remove("hidden");
  };

/**
 * Fechar o menu se a janela tiver mais de 760px de
 * largura.
 * 
 * @listens window.resize
 */
  const handleResize = () => {
    if (window.innerWidth > 760) {
      headerEl.classList.remove("menu-open");
    }
  };

  window.addEventListener("resize", handleResize);
}

init();
