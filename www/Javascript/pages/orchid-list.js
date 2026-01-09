import { Content } from "../components/content.js";
import { fetchJson } from "../helper/fetch.js";
import { navigateTo } from "../route.js";

export function OrchidListPage() {
  const orchidList = document.createElement("div");
  orchidList.classList.add("orchid-list");

  fetchJson("/api/orchids")
    .then((orchids) => {
      if (orchids && orchids.length > 0) {
        orchids.forEach((orchid) => {
          const orchidItem = createOrchidItem(orchid);
          orchidList.appendChild(orchidItem);
        });
      }
    })
    .catch((error) => {
      console.error("Erro ao carregar orquídeas:", error);
      orchidList.innerHTML = "<p>Erro ao carregar orquídeas</p>";
    });

  return Content("Lista de Orquídeas", orchidList);
}

function createOrchidItem(orchid) {
  const item = document.createElement("div");
  item.classList.add("orchid-item");

  const image = document.createElement("img");
  image.src = orchid.image;
  image.alt = orchid.description;

  const description = document.createElement("p");
  description.textContent = orchid.description;

  const btnDetails = document.createElement("button");
  btnDetails.textContent = "Ver Detalhes";
  btnDetails.classList.add("btn");
  btnDetails.classList.add("btn-details");

  btnDetails.addEventListener("click", async () => {
    await navigateTo(`?orchid-id=${orchid.id}`);
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

  btnDelete.addEventListener("click", async () => {
    if (confirm("Tem certeza que deseja excluir esta orquídea?")) {
      try {
        const response = await fetch(`/api/orchids/${orchid.id}`, { method: "DELETE" });
        if (response.ok) {
          navigateTo("?characteristic=all");
        } else {
          alert("Erro ao excluir orquídea.");
        }
      } catch (error) {
        alert("Erro ao excluir orquídea: " + error.message);
      }
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
