import { data } from "./data.js";

const homeH1 = document.createElement("h1");
homeH1.textContent = "Géneros";
homeH1.classList.add("name");

const homeUl = document.createElement("ul");
homeUl.classList.add("genus-list");

data.genus.forEach((item) => {
  const li = document.createElement("li");
  li.classList.add("genus-item");

  const a = document.createElement("a");
  a.textContent = item.description;
  a.setAttribute("id", item.description.toLocaleLowerCase());
  a.classList.add("genus-link");

  li.appendChild(a);

  homeUl.appendChild(li);
});

function init() {
  document.body.appendChild(homeH1);
  document.body.appendChild(homeUl);
}

init();
console.log(data);
