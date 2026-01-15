/**
 * Cria um elemento div com um id "logo" e contém um span com o texto "PRO" e o texto "Orquideas".
 * @returns {HTMLElement} O elemento div com o id "logo".
 */
export const Logo = () => {
  const logo = document.createElement("div");
  logo.setAttribute("id", "logo");

  const span = document.createElement("span");
  span.textContent = "PRO";

  logo.textContent = "Orquideas ";
  logo.appendChild(span);

  return logo;
};
