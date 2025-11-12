import { sendThemePageExit } from "./general.js";

// Run
loadCategories();

// Loads the quiz categories for the index page
function loadCategories() {
  fetch("./data.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const quizzes = data.quizzes;

      // Loads the categories to DOM
      quizzes.forEach((quiz) => {
        const title = quiz.title;
        const icon = quiz.icon;

        const container = document.getElementById("container-display-category");

        container.innerHTML += `
        <section class="button-choice ${title.toLowerCase()}"
        id="category-${title.toLowerCase()}"  
        role="link" 
        data-category="${title.toLowerCase()}">
          <img src="${icon}" alt="icon ${title.toLowerCase()}" />
          <span class="font-color-1">${title}</span>
        </section>
        `;
      });

      // Delegates the button functions for the categories
      quizzes.forEach((quiz) => {
        const title = quiz.title;

        const section = document.getElementById(
          `category-${title.toLowerCase()}`
        );

        section.addEventListener("click", () => {
          window.location.href = `./html/quiz-page.html?key=${title.toLowerCase()}&theme=${sendThemePageExit()}`;
        });
      });
    });
}
