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
  left.innerHTML = `
    <div class="contact-icon" aria-hidden="true"><i class="fa-solid fa-phone"></i></div>
    <p class="about-sub">Call for Carlos Sousa</p>
    <p class="about-phone">+233 54 672 0633</p>
    <p class="about-email">201702018@estudantes.ips.pt</p>
  `;

  // Contact block 2
  const rightInfo = document.createElement("div");
  rightInfo.classList.add("contact-info");
  rightInfo.innerHTML = `
    <div class="contact-icon" aria-hidden="true"><i class="fa-solid fa-user"></i></div>
    <p class="about-sub">Call for Fabio Junik</p>
    <p class="about-phone">+233 98 465 2331</p>
    <p class="about-email">2024109274@estudantes.ips.pt</p>
  `;

  // Contact form
  const formWrap = document.createElement("div");
  formWrap.classList.add("contact-form");
  formWrap.innerHTML = `
    <form>
      <label>Name :</label>
      <input type="text" placeholder="insert name" />
      <label>Email :</label>
      <input type="email" placeholder="insert email" />
      <label>Message :</label>
      <textarea placeholder="write message"></textarea>
      <button type="submit" class="btn">Send Message</button>
    </form>
  `;

  section.appendChild(left);
  section.appendChild(rightInfo);
  section.appendChild(formWrap);

  // Add LogoIPS image below contacts
  const logoWrapper = document.createElement("div");
  logoWrapper.classList.add("logo-ips-wrapper");
  logoWrapper.innerHTML = `
    <img src="/www/images/LogoIPS.png" alt="IPS Logo" class="logo-ips" />
  `;
  section.appendChild(logoWrapper);

  return section;
};

export default Info;