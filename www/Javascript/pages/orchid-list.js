import { Content } from "../components/content.js";
import { fetchJson } from "../helper/fetch.js";
import { navigateTo } from "../route.js";

/**
 * Retorna uma página com uma lista de orquídeas.
 * Busca a lista de orquídeas da API e então cria uma página com uma lista de orquídeas.
 * Se houver um erro, ele exibirá uma mensagem de erro em vez disso.
 * @returns {Content} Uma página com uma lista de orquídeas.
 */
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

/**
 * Cria um item da lista de orquídeas com as informações da orquídea e botões para ver detalhes, editar e excluir.
 * @param {Orchid} orchid - A orquídea a ser renderizada.
 * @returns {HTMLElement} Um item da lista de orquídeas com as informações da orquídea e botões para ver detalhes, editar e excluir.
*/
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
