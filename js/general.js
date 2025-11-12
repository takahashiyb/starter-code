const query = window.location.search;

const param = new URLSearchParams(query);

const theme = param.get("theme");

// Run
displayTheme(theme);
assignEventSwitchThemes();

// Displays the icon of a category and its title
export function displayCategoryHeader(object, parent) {
  const container = parent.querySelector(".wrapper-display-category");

  const title = container.querySelector(".category-name");

  title.innerHTML = object.title;

  container.classList.add(object.title.toLowerCase());

  const titleImage = container.querySelector("img");

  titleImage.src = `.${object.icon}`;

  titleImage.alt = `icon ${object.title.toLowerCase()}`;
}

// Sets the page theme
function displayTheme(theme) {
  if (theme === "dark") {
    document.querySelector("body").classList.add(theme);
  }
}

// assigns the event for switching themes
function assignEventSwitchThemes() {
  const switchTheme = document.getElementById("wrapper-switch-color-mode");

  switchTheme.addEventListener("click", () => {
    toggleSwitchTheme();
  });
}

// handles the event for switching themes
function toggleSwitchTheme() {
  const element = document.querySelector("body");

  element.classList.toggle("dark");
}

// returns the current theme to be sent went page changes
export function sendThemePageExit() {
  const body = document.querySelector("body");
  let theme = "";
  if (body.classList.contains("dark")) {
    theme = "dark";
  }

  return theme;
}
