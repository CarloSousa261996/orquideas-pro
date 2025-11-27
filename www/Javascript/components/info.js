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
    <p class="about-email">fabiojunik@gmail.com</p>
  `;

  // Contact form
  const formWrap = document.createElement("div");
  formWrap.classList.add("contact-form");
  formWrap.innerHTML = `
    <form>
      <label>Name :</label>
      <input type="text" placeholder="Name" />
      <label>Email :</label>
      <input type="email" placeholder="Email" />
      <label>Message :</label>
      <textarea placeholder="Message"></textarea>
      <button type="submit" class="btn">Send Message</button>
    </form>
  `;

  section.appendChild(left);
  section.appendChild(rightInfo);
  section.appendChild(formWrap);

  return section;
};

export default Info;