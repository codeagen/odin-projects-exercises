// Main app logic
class RestaurantApp {
  constructor() {
    this.contentDiv = document.getElementById("content");
    this.navButtons = document.querySelectorAll(".nav-button");
    this.currentTab = "home";

    this.init();
  }

  init() {
    // Load initial home page
    this.loadTab("home");

    // Add event listeners to navigation buttons
    this.navButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const tabName = e.target.getAttribute("data-tab");
        this.loadTab(tabName);
        this.setActiveButton(e.target);
      });
    });
  }

  loadTab(tabName) {
    // Clear current content
    this.contentDiv.innerHTML = "";

    let content;
    switch (tabName) {
      case "home":
        content = homeModule.createHomePage();
        break;
      case "menu":
        content = menuModule.createMenuPage();
        break;
      case "contact":
        content = contactModule.createContactPage();
        break;
      default:
        content = homeModule.createHomePage();
    }

    this.contentDiv.appendChild(content);
    this.currentTab = tabName;
  }

  setActiveButton(activeButton) {
    this.navButtons.forEach((button) => {
      button.classList.remove("active");
    });
    activeButton.classList.add("active");
  }
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new RestaurantApp();
});

// Initial load message
console.log("Bella Vista Restaurant app loaded successfully!");
