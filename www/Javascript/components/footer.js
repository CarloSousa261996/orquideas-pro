import { Logo } from "./logo.js";

export function Footer() {
  const footer = document.createElement("footer");

  footer.appendChild(Logo());

  const utilsLink = [
    { label: "GitHub", url: "https://github.com" },
    { label: "LinkedIn", url: "https://www.linkedin.com" },
    { label: "Twitter", url: "https://twitter.com" },
  ];

  const footerLink = document.createElement("div");
  footerLink.classList.add("footer-links");

  utilsLink.forEach((item) => {
    const a = document.createElement("a");
    a.textContent = item.label;
    a.href = item.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    footerLink.appendChild(a);
  });

  const copyright = document.createElement("p");
  copyright.textContent = "About © Tecnologia Setúbal • Programação Web";
  copyright.classList.add("copyright");

  footer.appendChild(footerLink);
  footer.appendChild(copyright);
  return footer;
}
