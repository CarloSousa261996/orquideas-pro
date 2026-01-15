import { Info } from "../components/info.js";

/**
 * Creates a page with contact information and a call-to-action banner.
 *
 * @returns {HTMLElement} A section element with the contact information and CTA banner.
 */
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
      <h3>Explore the world of orchids</h3>
      <p>find the perfect species for your home or garden.</p>
      <button class="btn cta-btn">Contact us</button>
    </div>
  `;

  content.appendChild(cta);
  return content;
};
