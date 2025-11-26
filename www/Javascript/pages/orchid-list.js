import { Content } from "../components/content.js";
import { data } from "../data.js";
import { navigateTo } from "../route.js";

export function OrchidListPage() {
  const orchidList = document.createElement("div");
  orchidList.classList.add("orchid-list");

  data.orchid.forEach((orchid) => {
    const orchidItem = createOrchidItem(orchid);
    orchidList.appendChild(orchidItem);
  });

  return Content("Lista de Orquídeas", orchidList);
}

function createOrchidItem(orchid) {
  const item = document.createElement("div");
  item.classList.add("orchid-item");

  const image = document.createElement("img");
  image.src = orchid.src;
  image.alt = orchid.description;

  const description = document.createElement("p");
  description.textContent = orchid.description;

  const btnDetails = document.createElement("button");
  btnDetails.textContent = "Ver Detalhes";
  btnDetails.classList.add("btn");
  btnDetails.classList.add("btn-details");

  btnDetails.addEventListener("click", () => {
    navigateTo(`?orchid-id=${orchid.id}`);
  });

  const btnEdit = document.createElement("button");
  btnEdit.textContent = "Editar";
  btnEdit.classList.add("btn");
  btnEdit.classList.add("btn-edit");

  btnEdit.addEventListener("click", () => {
    navigateTo(`?orchid-id=${orchid.id}&edit=true`);
  });

  const btnDelete = document.createElement("button");
  btnDelete.textContent = "Excluir";
  btnDelete.classList.add("btn-delete");
  btnDelete.classList.add("btn");

  btnDelete.addEventListener("click", () => {
    const index = data.orchid.findIndex((o) => o.id === orchid.id);
    if (index !== -1) {
      data.orchid.splice(index, 1);
      navigateTo("?characteristic=all");
    }
  });

  const leftDiv = document.createElement("div");
  leftDiv.classList.add("info");
  const rightDiv = document.createElement("div");

  leftDiv.appendChild(image);
  leftDiv.appendChild(description);
  rightDiv.appendChild(btnDetails);
  rightDiv.appendChild(btnEdit);
  rightDiv.appendChild(btnDelete);

  item.appendChild(leftDiv);
  item.appendChild(rightDiv);

  return item;
}
