import { displayCategoryHeader } from "./general.js";

const query = window.location.search;

const param = new URLSearchParams(query);

const score = param.get("score");

const key = param.get("key");

const theme = param.get("theme");

const indicatorScore = document.getElementById("indicator-score");

indicatorScore.innerHTML = score;

loadPage();

function loadPage() {
  fetch("../data.json")
    .then((response) => {
      const data = response.json();
      return data;
    })
    .then((data) => {
      const object = data.quizzes.find(
        (object) => object.title.toLowerCase() === key
      );

      displayCategoryHeader(object);
      delegateButtonPlayAgain();
    });
}

function delegateButtonPlayAgain() {
  const button = document.getElementById("button-play-again");

  button.addEventListener("click", () => {
    window.location = `../index.html?theme=${theme}`;
  });
}
