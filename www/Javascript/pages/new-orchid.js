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
      description: inputDescription.value,
      genus_id: parseInt(form.elements[1].value),
      type_id: parseInt(form.elements[2].value),
      humidity_id: parseInt(form.elements[3].value),
      temperature_id: parseInt(form.elements[4].value),
      size_id: parseInt(form.elements[5].value),
      luminosity_id: parseInt(form.elements[6].value),
    };

    fetch("/api/orchids", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOrchid),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });
        navigateTo(`?characteristic=all`);
      })
      .catch((err) => {
        console.log({ err });
        alert("Erro ao cadastrar orquídea.");
      });
  });

  return Content("Cadastrar Nova Orquídea", form);
}
