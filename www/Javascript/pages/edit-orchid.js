import { Content } from "../components/content.js";
import { Select } from "../components/select.js";
import { data } from "../data.js";
import { navigateTo } from "../route.js";
import { fetchJson } from "../helper/fetch.js";

export function EditOrchidPage() {
  const form = document.createElement("form");
  form.classList.add("new-orchid-form");

  const orchidId = new URLSearchParams(location.search).get("orchid-id");
  const orchid = data.orchid.find((o) => o.id === parseInt(orchidId));

  const inputDescription = document.createElement("input");
  inputDescription.setAttribute("type", "text");
  inputDescription.setAttribute("placeholder", "Descrição da Orquídea");
  inputDescription.value = orchid.description;

  const inputImage = document.createElement("input");
  inputImage.setAttribute("type", "file");
  inputImage.setAttribute("accept", "image/*");
  inputImage.setAttribute("placeholder", "Selecionar imagem");

  const createBtn = document.createElement("button");
  createBtn.classList.add("btn");
  createBtn.textContent = "Salvar";

  form.appendChild(inputDescription);
  form.appendChild(inputImage);
  form.appendChild(Select(data.genus, "Género", orchid.genus));
  form.appendChild(Select(data.type, "Tipo", orchid.type));
  form.appendChild(Select(data.humidity, "Humidade", orchid.humidity));
  form.appendChild(Select(data.temperature, "Temperatura", orchid.temperature));
  form.appendChild(Select(data.size, "Tamanho", orchid.size));
  form.appendChild(Select(data.luminosity, "Luminosidade", orchid.luminosity));
  form.appendChild(createBtn);

  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();

    const formData = new FormData();
    formData.append("description", inputDescription.value);
    formData.append("genus_id", parseInt(form.elements[2].value));
    formData.append("type_id", parseInt(form.elements[3].value));
    formData.append("humidity_id", parseInt(form.elements[4].value));
    formData.append("temperature_id", parseInt(form.elements[5].value));
    formData.append("size_id", parseInt(form.elements[6].value));
    formData.append("luminosity_id", parseInt(form.elements[7].value));

    if (inputImage.files.length > 0) {
      formData.append("image", inputImage.files[0]);
    }

    try {
      await fetchJson(`/api/orchids/${orchid.id}`, {
        method: "PUT",
        body: formData,
      });
      navigateTo(`?orchid-id=${orchid.id}`);
    } catch (error) {
      alert("Erro ao atualizar orquídea: " + error.message);
    }
  });

  return Content("Editar Orquídea", form);
}
