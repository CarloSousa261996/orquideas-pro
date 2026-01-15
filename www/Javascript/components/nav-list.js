import { navigateTo } from "../route.js";

/**
 * Cria um elemento ul com op es de navega o para caracter sticas de orqu deas.
 * As op es s o:
 * - G nero
 * - Tipo
 * - Luminosidade
 * - Tamanho
 * - Humidade
 * - Temperatura
 * - Todas
 * Cada op o  um link que navega para a p gina com a lista de orqu deas que possuem a caracter stica espec fica.
 * @returns {HTMLElement} Um elemento ul com op es de navega o para caracter sticas de orqu deas.
*/
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
