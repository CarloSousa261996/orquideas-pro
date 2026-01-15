/**
 * Cria um elemento select com um placeholder.
 * @param {Array} options - Um array de objetos a serem adicionados como opções ao elemento select.
 * @param {String} labelText - O texto a ser exibido como rótulo para o elemento select.
 * @param {String} [selectedValue] - O valor da opção a ser selecionada por padrão.
 * @param {String} [placeholder] - O texto a ser exibido como placeholder para o elemento select.
 * @returns {HTMLElement} Um elemento div contendo um rótulo e um elemento select.
 */
export const Select = (options, labelText = "selecione", selectedValue, placeholder) => {
  const select = document.createElement("select");
  placeholder ||= `Selecione o(a) ${labelText}`;

  const placeholderOption = document.createElement("option");
  placeholderOption.textContent = placeholder;
  placeholderOption.disabled = true;
  placeholderOption.selected = true;
  select.appendChild(placeholderOption);

  if (selectedValue !== undefined) {
    select.value = selectedValue;
  }

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
