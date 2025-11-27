import { Info } from "../components/info.js";

export const AboutPage = () => {
  const content = document.createElement("section");
  content.classList.add("content", "about-page");

  // Info component provides contact blocks + form
  const infoSection = Info();
  content.appendChild(infoSection);

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

  content.appendChild(cta);
  return content;
};
