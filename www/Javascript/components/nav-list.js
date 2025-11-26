import { navigateTo } from "../route.js";

export const NavList = () => {
  const navUl = document.createElement("ul");

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

  return navUl;
};
