import { Footer } from "./footer.js";

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
