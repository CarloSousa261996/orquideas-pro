import { navigateTo } from "../route.js";

export const Header = () => {
  const header = document.createElement("header");
  const logo = document.createElement("h1");
  const nav = document.createElement("nav");
  const navUl = document.createElement("ul");

  logo.textContent = "Orquideas PRO";

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

    navUl.appendChild(li);
  });

  navUl.appendChild(NewOrchidBtn());
  nav.appendChild(navUl);

  header.appendChild(logo);
  header.appendChild(nav);

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
