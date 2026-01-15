import { Logo } from "./logo.js";

/**
 * Cria um elemento footer com o logotipo e links para as redes sociais da Tecnologia Setubal.
 * @returns {HTMLElement} O elemento footer com o logotipo e links para as redes sociais da Tecnologia Setubal.
 */
export function Footer() {
  const footer = document.createElement("footer");

  footer.appendChild(Logo());

  const utilsLink = [
    { label: "GitHub", url: "https://github.com", iconClass: "fa-brands fa-github" },
    { label: "LinkedIn", url: "https://www.linkedin.com", iconClass: "fa-brands fa-linkedin" },
    { label: "Twitter", url: "https://twitter.com", iconClass: "fa-brands fa-twitter" },
    { label: "Facebook", url: "https://www.facebook.com", iconClass: "fa-brands fa-facebook" },
  ];

  const footerLink = document.createElement("div");
  footerLink.classList.add("footer-links");

  utilsLink.forEach((item) => {
    const a = document.createElement("a");
    a.href = item.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.setAttribute("aria-label", item.label);
    a.title = item.label;

    const icon = document.createElement("i");
    icon.className = item.iconClass;
    icon.style.fontSize = "24px";
    icon.style.margin = "0 10px";
    icon.classList.add("iconClass");
    a.appendChild(icon);
    footerLink.appendChild(a);
  });

  const copyright = document.createElement("p");
  copyright.textContent = "About © Tecnologia Setúbal • Programação Web";
  copyright.classList.add("copyright");

  footer.appendChild(footerLink);
  footer.appendChild(copyright);
  return footer;
}
