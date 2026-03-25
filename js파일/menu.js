document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const menuGroups = document.querySelectorAll("[data-category-group]");

  if (tabButtons.length === 0 || menuGroups.length === 0) return;

  const activateTab = (targetCategory) => {
    tabButtons.forEach((button) => {
      const isActive = button.dataset.category === targetCategory;
      button.classList.toggle("active", isActive);
    });

    menuGroups.forEach((group) => {
      const groupCategory = group.dataset.categoryGroup;

      if (targetCategory === "all" || targetCategory === groupCategory) {
        group.style.display = "";
      } else {
        group.style.display = "none";
      }
    });
  };

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;
      activateTab(category);
    });
  });

  activateTab("all");
});