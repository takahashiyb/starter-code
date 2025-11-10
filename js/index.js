const query = window.location.search;

const param = new URLSearchParams(query);

const score = param.get("score");

const key = param.get("key");

const theme = param.get("theme");

loadCategories();

function loadCategories() {
  fetch("./data.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const quizzes = data.quizzes;

      quizzes.forEach((quiz) => {
        const title = quiz.title;
        const icon = quiz.icon;

        const container = document.getElementById("container-display-category");

        container.innerHTML += `
      <section
      id="category-${title.toLowerCase()}" 
      class="wrapper-display-category" 
      role="link" 
      data-category="${title.toLowerCase()}">
        <img src="${icon}" alt="icon ${title.toLowerCase()}" />
        <span>${title}</span>
      </section>
      `;
      });

      quizzes.forEach((quiz) => {
        const title = quiz.title;

        const section = document.getElementById(
          `category-${title.toLowerCase()}`
        );

        section.style.background = "red";

        section.addEventListener("click", () => {
          this.window.location.href = `./html/quiz-page.html?key=${title.toLowerCase()}&theme=dark`;
        });
      });
    });
}
