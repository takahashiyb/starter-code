import { displayCategoryHeader, sendThemePageExit } from "./general.js";

const query = window.location.search;

const param = new URLSearchParams(query);

const score = param.get("score");

const key = param.get("key");

const indicatorScore = document.getElementById("indicator-score");

indicatorScore.innerHTML = score;

// Run
loadPage();

// Loads page
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

      const header = document.querySelector(".header-page");

      const body = document.querySelector(".container-display-score");

      displayCategoryHeader(object, header);
      displayCategoryHeader(object, body);
      delegateButtonPlayAgain();
    });
}

function delegateButtonPlayAgain() {
  const button = document.getElementById("button-play-again");

  button.addEventListener("click", () => {
    window.location = `../index.html?theme=${sendThemePageExit()}`;
  });
}
