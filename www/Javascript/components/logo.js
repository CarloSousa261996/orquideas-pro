export const Logo = () => {
  const logo = document.createElement("div");
  logo.setAttribute("id", "logo");

  const span = document.createElement("span");
  span.textContent = "PRO";

  logo.textContent = "Orquideas ";
  logo.appendChild(span);

  return logo;
};
