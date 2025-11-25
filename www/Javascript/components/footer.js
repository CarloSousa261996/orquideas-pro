export function Footer() {
  const footer = document.createElement("footer");
  const footerLink = document.createElement("a");

  footerLink.textContent = "About &copy; Tecnologia Setúbal &bull; Programação Web";
  footerLink.classList.add("about-link");

  footer.appendChild(footerLink);
  return footer;
}
