import { Logo } from "./logo.js";

/**
 * Cria um elemento footer com o logotipo e links para as redes sociais da Tecnologia Setubal.
 * @returns {HTMLElement} O elemento footer com o logotipo e links para as redes sociais da Tecnologia Setubal.
 */
export function Footer() {
  const footer = document.createElement("footer");

  const cta = document.createElement("section");
  cta.classList.add("cta-section");

  const ctaInner = document.createElement("div");
  ctaInner.classList.add("cta-inner");

  const ctaTitle = document.createElement("h3");
  ctaTitle.textContent = "Explore o mundo das orquídeas e";

  const ctaText = document.createElement("p");
  ctaText.textContent = "encontre a espécie perfeita para sua casa ou jardim.";

  const ctaButton = document.createElement("button");
  ctaButton.classList.add("btn", "cta-btn");
  ctaButton.textContent = "Contacte-nos";

  ctaInner.appendChild(ctaTitle);
  ctaInner.appendChild(ctaText);
  ctaInner.appendChild(ctaButton);
  cta.appendChild(ctaInner);

  footer.appendChild(cta);
  return footer;
}
