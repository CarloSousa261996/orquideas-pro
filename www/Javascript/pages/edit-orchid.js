import { Content } from "../components/content.js";
import { Select } from "../components/select.js";
import { getAllCharacteristics } from "../helper/characteristics.js";
import { navigateTo } from "../route.js";
import { fetchJson } from "../helper/fetch.js";

/**
 * Página de edição de orquídea.
 * Renderiza a página com um formulário para editar uma orquídea.
 * Busca a orquídea da API com base no ID passado na URL e então cria uma página com um formulário para editar a orquídea.
 * Se houver um erro, ele exibirá uma mensagem de erro em vez disso.
 * @returns {Content} Uma página com um formulário para editar a orquídea.
 */
export async function EditOrchidPage() {
  const orchidId = new URLSearchParams(location.search).get("orchid-id");

  try {
    const [orchid, characteristics] = await Promise.all([fetchJson(`/api/orchids/${orchidId}`), getAllCharacteristics()]);

    const form = document.createElement("form");
    form.classList.add("new-orchid-form");

    const inputDescription = document.createElement("input");
    inputDescription.setAttribute("type", "text");
    inputDescription.setAttribute("placeholder", "Descrição da Orquídea");
    inputDescription.value = orchid.description;

    const inputImage = document.createElement("input");
    inputImage.setAttribute("type", "file");
    inputImage.setAttribute("accept", "image/*");
    inputImage.setAttribute("placeholder", "Selecionar imagem");

    if (orchid.image) {
      const imgPreview = document.createElement("img");
      imgPreview.src = orchid.image;
      imgPreview.height = 200;
      imgPreview.style.objectFit = "cover";
      imgPreview.alt = "Imagem atual da orquídea";
      imgPreview.classList.add("orchid-image-preview");
      form.appendChild(imgPreview);
    }

    const createBtn = document.createElement("button");
    createBtn.classList.add("btn");
    createBtn.textContent = "Salvar";

    form.appendChild(inputDescription);
    form.appendChild(inputImage);
    form.appendChild(Select(characteristics.genus, "Género", orchid.genus.id));
    form.appendChild(Select(characteristics.type, "Tipo", orchid.type.id));
    form.appendChild(Select(characteristics.humidity, "Humidade", orchid.humidity.id));
    form.appendChild(Select(characteristics.temperature, "Temperatura", orchid.temperature.id));
    form.appendChild(Select(characteristics.size, "Tamanho", orchid.size.id));
    form.appendChild(Select(characteristics.luminosity, "Luminosidade", orchid.luminosity.id));
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
  } catch (error) {
    console.error("Erro ao carregar dados da orquídea:", error);
    const errorDiv = document.createElement("div");
    errorDiv.textContent = "Erro ao carregar dados da orquídea";
    return Content("Erro", errorDiv);
  }
}
