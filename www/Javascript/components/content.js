import { Footer } from "./footer.js";

/**
 * Cria um elemento div com a classe "content" e um título.
 * Recebe um título e uma lista de elementos a serem adicionados ao elemento div.
 * @param {String} title - O título a ser exibido.
 * @param {...HTMLElement} component - Os elementos a serem adicionados ao elemento div.
 * @returns {HTMLElement} O elemento div com o título e os elementos adicionados.
 */
export function Content(title, ...component) {
  const content = document.createElement("div");
  content.classList.add("content");

  const h1 = document.createElement("h1");
  h1.classList.add("name");
  h1.textContent = title;

  content.appendChild(h1);
  component.forEach((component) => {
    content.appendChild(component);
  });
  return content;
}
