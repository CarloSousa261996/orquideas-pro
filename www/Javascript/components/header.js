import { navigateTo } from "../route.js";
import { Logo } from "./logo.js";

/**
 * Cria um elemento header com o logotipo e um menu de navega o.
 * O menu de navega o cont m op es de caracter sticas de orqu deas.
 * Cada op o  um link que navega para a p gina com a lista de orqu deas que possuem a caracter stica espec fica.
 * @returns {HTMLElement} O elemento header com o logotipo e o menu de navega o.
 */
export const Header = () => {
  const header = document.createElement("header");
  const logo = Logo();
  const nav = document.createElement("nav");
  const navUl = document.createElement("ul");

  const menuToggle = document.createElement("button");
  menuToggle.classList.add("menu-toggle");
  menuToggle.textContent = "☰";

  menuToggle.addEventListener("click", () => {
    header.classList.toggle("menu-open");
  });

  const navItens = [
    {
      label: "Gênero",
      value: "genus",
    },
    {
      label: "Tipos",
      value: "type",
    },
    {
      label: "Luminosidade",
      value: "luminosity",
    },
    {
      label: "Tamanho",
      value: "size",
    },
    {
      label: "Humidade",
      value: "humidity",
    },
    {
      label: "Temperatura",
      value: "temperature",
    },
    {
      label: "Todas",
      value: "all",
    },
  ];

  navItens.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.label;
    li.setAttribute("id", item.value);
    li.addEventListener("click", () => navigateTo(`?characteristic=${item.value}`));
    li.addEventListener("click", () => {
      header.classList.remove("menu-open");
    });

    navUl.appendChild(li);
  });

  navUl.appendChild(NewOrchidBtn());
  // adicionar link About
  const aboutLi = document.createElement("li");
  aboutLi.textContent = "About";
  aboutLi.setAttribute("id", "about");
  aboutLi.addEventListener("click", () => navigateTo("?about=true"));
  navUl.appendChild(aboutLi);
  nav.appendChild(navUl);

  header.appendChild(logo);
  header.appendChild(nav);
  header.appendChild(menuToggle);

  window.addEventListener("click", (event) => {
    if (header.classList.contains("menu-open") && !header.contains(event.target) && event.target !== menuToggle) {
      header.classList.remove("menu-open");
    }
  });

  return header;
};

export const NewOrchidBtn = () => {
  const button = document.createElement("button");
  button.textContent = "Nova Orquídea";
  button.classList.add("btn");
  button.addEventListener("click", () => {
    navigateTo("?new-orchid=true");
  });
  return button;
};
