/**
 * Cria um elemento section com as informações de contato e um formulário para enviar uma mensagem.
 * O elemento section contém dois blocos de contato com informações de nome, telefone e email, e um formulário com campos de entrada para nome, email e mensagem.
 * O formulário contém um botão para enviar a mensagem.
 * @returns {HTMLElement} O elemento section com as informações de contato e o formulário para enviar uma mensagem.
 */
export const Info = () => {
  const section = document.createElement("section");
  section.classList.add("contact-section");

  // Contact block 1
  const left = document.createElement("div");
  left.classList.add("contact-info");

  const leftIcon = document.createElement("div");
  leftIcon.classList.add("contact-icon");
  leftIcon.setAttribute("aria-hidden", "true");
  const phoneIcon = document.createElement("i");
  phoneIcon.classList.add("fa-solid", "fa-phone");
  leftIcon.appendChild(phoneIcon);

  const leftSub = document.createElement("p");
  leftSub.classList.add("about-sub");
  leftSub.textContent = "Call for Carlos Sousa";

  const leftPhone = document.createElement("p");
  leftPhone.classList.add("about-phone");
  leftPhone.textContent = "+233 54 672 0633";

  const leftEmail = document.createElement("p");
  leftEmail.classList.add("about-email");
  leftEmail.textContent = "201702018@estudantes.ips.pt";

  left.appendChild(leftIcon);
  left.appendChild(leftSub);
  left.appendChild(leftPhone);
  left.appendChild(leftEmail);

  // Contact block 2
  const rightInfo = document.createElement("div");
  rightInfo.classList.add("contact-info");

  const rightIcon = document.createElement("div");
  rightIcon.classList.add("contact-icon");
  rightIcon.setAttribute("aria-hidden", "true");
  const userIcon = document.createElement("i");
  userIcon.classList.add("fa-solid", "fa-user");
  rightIcon.appendChild(userIcon);

  const rightSub = document.createElement("p");
  rightSub.classList.add("about-sub");
  rightSub.textContent = "Call for Fabio Junik";

  const rightPhone = document.createElement("p");
  rightPhone.classList.add("about-phone");
  rightPhone.textContent = "+233 98 465 2331";

  const rightEmail = document.createElement("p");
  rightEmail.classList.add("about-email");
  rightEmail.textContent = "2024109274@estudantes.ips.pt";

  rightInfo.appendChild(rightIcon);
  rightInfo.appendChild(rightSub);
  rightInfo.appendChild(rightPhone);
  rightInfo.appendChild(rightEmail);

  // Contact form
  const formWrap = document.createElement("div");
  formWrap.classList.add("contact-form");

  const form = document.createElement("form");

  const nameLabel = document.createElement("label");
  nameLabel.textContent = "Name :";
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.placeholder = "insert name";

  const emailLabel = document.createElement("label");
  emailLabel.textContent = "Email :";
  const emailInput = document.createElement("input");
  emailInput.type = "email";
  emailInput.placeholder = "insert email";

  const messageLabel = document.createElement("label");
  messageLabel.textContent = "Message :";
  const messageTextarea = document.createElement("textarea");
  messageTextarea.placeholder = "write message";

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.classList.add("btn");
  submitButton.textContent = "Send Message";

  form.appendChild(nameLabel);
  form.appendChild(nameInput);
  form.appendChild(emailLabel);
  form.appendChild(emailInput);
  form.appendChild(messageLabel);
  form.appendChild(messageTextarea);
  form.appendChild(submitButton);

  formWrap.appendChild(form);

  section.appendChild(left);
  section.appendChild(rightInfo);
  section.appendChild(formWrap);

  // Add LogoIPS image below contacts
  const logoWrapper = document.createElement("div");
  logoWrapper.classList.add("logo-ips-wrapper");

  const logoImg = document.createElement("img");
  logoImg.src = "/www/images/LogoIPS.png";
  logoImg.alt = "IPS Logo";
  logoImg.classList.add("logo-ips");

  logoWrapper.appendChild(logoImg);
  section.appendChild(logoWrapper);

  return section;
};

export default Info;
