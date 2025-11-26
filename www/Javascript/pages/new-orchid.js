import { Content } from "../components/content.js";
import { Select } from "../components/select.js";
import { data } from "../data.js";
import { navigateTo } from "../route.js";

export function NewOrchidPage() {
  const form = document.createElement("form");
  form.classList.add("new-orchid-form");

  const inputDescription = document.createElement("input");
  inputDescription.setAttribute("type", "text");
  inputDescription.setAttribute("placeholder", "Descrição da Orquídea");

  const createBtn = document.createElement("button");
  createBtn.classList.add("btn");
  createBtn.textContent = "Salvar";

  form.appendChild(inputDescription);
  form.appendChild(Select(data.genus, "Género"));
  form.appendChild(Select(data.type, "Tipo"));
  form.appendChild(Select(data.humidity, "Humidade"));
  form.appendChild(Select(data.temperature, "Temperatura"));
  form.appendChild(Select(data.size, "Tamanho"));
  form.appendChild(Select(data.luminosity, "Luminosidade"));
  form.appendChild(createBtn);

  form.addEventListener("submit", (ev) => {
    ev.preventDefault();

    const newOrchid = {
      id: data.orchid.length + 1,
      description: inputDescription.value,
      genus: parseInt(form.elements[1].value),
      type: parseInt(form.elements[2].value),
      humidity: parseInt(form.elements[3].value),
      temperature: parseInt(form.elements[4].value),
      size: parseInt(form.elements[5].value),
      luminosity: parseInt(form.elements[6].value),
    };

    data.orchid.push(newOrchid);
    console.log(data.orchid);
    navigateTo(`?orchid-id=${newOrchid.id}`);
  });

  return Content("Cadastrar Nova Orquídea", form);
}
