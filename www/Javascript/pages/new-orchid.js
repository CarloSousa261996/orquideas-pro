import { Content } from "../components/content.js";
import { Select } from "../components/select.js";
import { getAllCharacteristics } from "../helper/characteristics.js";
import { navigateTo } from "../route.js";
import { fetchJson } from "../helper/fetch.js";

/**
 * Função para criar uma nova orquídea.
 *
 * @returns {Content} - O conteúdo da página.
 */
export async function NewOrchidPage() {
  const characteristics = await getAllCharacteristics();

  const form = document.createElement("form");
  form.classList.add("new-orchid-form");

  const inputDescription = document.createElement("input");
  inputDescription.setAttribute("type", "text");
  inputDescription.setAttribute("placeholder", "Descrição da Orquídea");

  const inputImage = document.createElement("input");
  inputImage.setAttribute("type", "file");
  inputImage.setAttribute("accept", "image/*");
  inputImage.setAttribute("placeholder", "Selecionar imagem");

  const createBtn = document.createElement("button");
  createBtn.classList.add("btn");
  createBtn.textContent = "Salvar";

  form.appendChild(inputDescription);
  form.appendChild(inputImage);
  form.appendChild(Select(characteristics.genus, "Género"));
  form.appendChild(Select(characteristics.type, "Tipo"));
  form.appendChild(Select(characteristics.humidity, "Humidade"));
  form.appendChild(Select(characteristics.temperature, "Temperatura"));
  form.appendChild(Select(characteristics.size, "Tamanho"));
  form.appendChild(Select(characteristics.luminosity, "Luminosidade"));
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
      const result = await fetchJson("/api/orchids", {
        method: "POST",
        body: formData,
      });
      if (result && result.id) {
        navigateTo(`?characteristic=all`);
      } else {
        alert("Erro ao cadastrar orquídea.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Erro ao cadastrar orquídea: " + err.message);
    }
  });

  return Content("Cadastrar Nova Orquídea", form);
}
