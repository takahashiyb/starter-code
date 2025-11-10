export function displayCategoryHeader(object) {
  const title = document.querySelector("h1");

  title.innerHTML = object.title;

  const titleImage = document.querySelector(".header-page img");

  titleImage.src = `.${object.icon}`;
}
