export const Header = () => {
  const header = document.createElement("header");
  const logo = document.createElement("h1");
  const nav = document.createElement("nav");
  const navUl = document.createElement("ul");

  logo.textContent = "Orquideas PRO";

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
  ];

  navItens.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.label;
    li.setAttribute("id", item.value);

    li.addEventListener("click", () => {
      window.location.href = `index.html?characteristic=${item.value}`;
    });

    navUl.appendChild(li);
  });

  nav.appendChild(navUl);
  header.appendChild(logo);
  header.appendChild(nav);

  return header;
};
