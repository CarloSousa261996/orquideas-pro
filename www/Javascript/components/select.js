export const Select = (options, labelText = "selecione", placeholder) => {
  const select = document.createElement("select");
  placeholder ||= `Selecione o(a) ${labelText}`;

  const placeholderOption = document.createElement("option");
  placeholderOption.textContent = placeholder;
  placeholderOption.disabled = true;
  placeholderOption.selected = true;
  select.appendChild(placeholderOption);

  const div = document.createElement("div");
  div.classList.add("select");
  const label = document.createElement("label");
  label.textContent = labelText;

  div.appendChild(label);

  options.forEach((item) => {
    const option = document.createElement("option");
    option.textContent = item.description;
    option.value = item.id;

    select.appendChild(option);
  });

  div.appendChild(select);
  return div;
};
