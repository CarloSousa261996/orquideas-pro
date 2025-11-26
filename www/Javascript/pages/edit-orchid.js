import { Content } from "../components/content.js";
import { Select } from "../components/select.js";
import { data } from "../data.js";
import { navigateTo } from "../route.js";

export function EditOrchidPage() {
  const form = document.createElement("form");
  form.classList.add("new-orchid-form");

  const orchidId = new URLSearchParams(location.search).get("orchid-id");
  const orchid = data.orchid.find((o) => o.id === parseInt(orchidId));

  const inputDescription = document.createElement("input");
  inputDescription.setAttribute("type", "text");
  inputDescription.setAttribute("placeholder", "Descrição da Orquídea");
  inputDescription.value = orchid.description;

  const createBtn = document.createElement("button");
  createBtn.classList.add("btn");
  createBtn.textContent = "Salvar";

  form.appendChild(inputDescription);
  form.appendChild(Select(data.genus, "Género", orchid.genus));
  form.appendChild(Select(data.type, "Tipo", orchid.type));
  form.appendChild(Select(data.humidity, "Humidade", orchid.humidity));
  form.appendChild(Select(data.temperature, "Temperatura", orchid.temperature));
  form.appendChild(Select(data.size, "Tamanho", orchid.size));
  form.appendChild(Select(data.luminosity, "Luminosidade", orchid.luminosity));
  form.appendChild(createBtn);

  form.addEventListener("submit", (ev) => {
    ev.preventDefault();

    data.orchid = data.orchid.map((o) => {
      if (o.id === orchid.id) {
        return {
          ...orchid,
          description: inputDescription.value,
          genus: parseInt(form.elements[1].value),
          type: parseInt(form.elements[2].value),
          humidity: parseInt(form.elements[3].value),
          temperature: parseInt(form.elements[4].value),
          luminosity: parseInt(form.elements[6].value),
        };
      }
      return o;
    });

    navigateTo(`?orchid-id=${orchid.id}`);
  });

  return Content("Editar Orquídea", form);
}
