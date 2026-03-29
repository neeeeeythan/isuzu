const btn = document.getElementById("findMoreBtn");
const modal = document.getElementById("dashboardModal");
const closeBtn = document.getElementById("modalClose");

btn.addEventListener("click", () => modal.classList.add("active"));
closeBtn.addEventListener("click", () => modal.classList.remove("active"));

// Close on overlay click
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("active");
});

// Close on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") modal.classList.remove("active");
});
