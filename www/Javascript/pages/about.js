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

  content.appendChild(cta);
  return content;
};
