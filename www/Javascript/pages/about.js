import { navigateTo } from "../route.js";

export const AboutPage = () => {
  const content = document.createElement("section");
  content.classList.add("content", "about-page");

  // Contact / form area
  const contactSection = document.createElement("section");
  contactSection.classList.add("contact-section");

  const left = document.createElement("div");
  left.classList.add("contact-info");
  left.innerHTML = `
    <h2 class="about-title">Estamos à disposição! Fale com Carlos Sousa para mais informações..</h2>
    <p class="about-sub">Call for Carlos Sousa</p>
    <p class="about-phone">+233 54 672 0633</p>
    <p class="about-email">201702018@estudantes.ips.pt</p>
  `;
    const leftt = document.createElement("div");
    leftt.classList.add("contact-info");
    leftt.innerHTML = `
        <h2 class="about-title"> Estamos à disposição! Fale com Fabio Junik para mais informações.</h2>
        <p class="about-sub">Call for Fabio Junik</p>
    <p class="about-phone">+233 98 465 2331</p>
    <p class="about-email">fabiojunik@gmail.com</p>
  ` ;

  const right = document.createElement("div");
  right.classList.add("contact-form");
  right.innerHTML = `
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

  contactSection.appendChild(left);
  contactSection.appendChild(leftt);
  contactSection.appendChild(right);

  // CTA banner
  const cta = document.createElement("section");
  cta.classList.add("cta-section");
  cta.innerHTML = `
    <div class="cta-inner">
      <h3>Do you have any Contest?</h3>
      <p>Register with our virtual voting platform</p>
      <button class="btn cta-btn">Contact us</button>
    </div>
  `;

  content.appendChild(contactSection);
  content.appendChild(cta);

  return content;
};

export default AboutPage;
