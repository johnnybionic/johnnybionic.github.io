// Scroll details into view when opened - used on the local resources page
document.querySelectorAll("details").forEach(det => {
  det.addEventListener("toggle", () => {
    if (det.open) {
      det.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});