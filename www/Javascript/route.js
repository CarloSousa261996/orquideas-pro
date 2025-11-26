import { CharacteristicPage } from "./pages/characteristic-list.js";
import { EditOrchidPage } from "./pages/edit-orchid.js";
import { NewOrchidPage } from "./pages/new-orchid.js";
import { OrchidListPage } from "./pages/orchid-list.js";
import { OrchidDetailsPage } from "./pages/orchids-details.js";
import { OrchidPage } from "./pages/orchids.js";

export function navigateTo(url) {
  history.pushState(null, "", url);
  const main = document.getElementsByTagName("main")[0];
  const currentyContent = main.getElementsByClassName("content")[0];

  if (new URLSearchParams(location.search).get("characteristic") === "all") {
    main.replaceChild(OrchidListPage(), currentyContent);
  }

  if (new URLSearchParams(location.search).get("orchid-id") && new URLSearchParams(location.search).get("edit")) {
    main.replaceChild(EditOrchidPage(), currentyContent);
  }

  if (new URLSearchParams(location.search).get("characteristic") && !new URLSearchParams(location.search).get("characteristic-id")) {
    main.replaceChild(CharacteristicPage(), currentyContent);
  }

  if (new URLSearchParams(location.search).get("characteristic-id")) {
    main.replaceChild(OrchidPage(), currentyContent);
  }

  if (new URLSearchParams(location.search).get("orchid-id")) {
    main.replaceChild(OrchidDetailsPage(), currentyContent);
  }

  if (new URLSearchParams(location.search).get("new-orchid")) {
    main.replaceChild(NewOrchidPage(), currentyContent);
  }
}
