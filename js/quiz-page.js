import { displayCategoryHeader, sendThemePageExit } from "./general.js";

const query = window.location.search;

const param = new URLSearchParams(query);

const key = param.get("key");

let current = 0;

let questionsArray = [];

let score = 0;

// Run
loadPage();

// Handles the shuffling of questions and answers when called
function shuffle(array) {
  // Make a copy if you don’t want to mutate the original
  const arr = array.slice();

  for (let i = arr.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements arr[i] and arr[j]
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

// Initial Page Loader - Shuffles Questions then Load the first in queue
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

      displayCategoryHeader(object, header);

      const questions = object.questions;

      const copyQuestions = [...questions];

      questionsArray = shuffle(copyQuestions);
    })
    .then(() => {
      loadQuestion();
    });
}

// Loads the questions an choices
function loadQuestion() {
  const indicatorCurrent = document.getElementById("question-current");
  indicatorCurrent.innerHTML = current + 1;

  const indicatorTotal = document.getElementById("question-count");
  indicatorTotal.innerHTML = questionsArray.length;

  const questionDetail = document.querySelector("h2");
  questionDetail.innerHTML = questionsArray[current].question;

  const fieldset = document.getElementById("wrapper-button-choice");

  const options = questionsArray[current].options;

  let copyOptions = [...options];

  copyOptions = shuffle(copyOptions);

  fieldset.dataset.choice = "";

  for (let i = 0; i < 4; i++) {
    const button = document.getElementById(`button-choice-${i}`);

    button.value = copyOptions[i];

    button.dataset.selected = "false";

    button.classList.remove("correct", "wrong");

    button.removeAttribute("inert");

    const img = button.querySelector("img");

    if (img) {
      button.removeChild(img);
    }

    const info = document.querySelector(`#button-choice-${i} .choice-info`);

    info.innerHTML = copyOptions[i];

    const submit = document.getElementById("submit-button");

    // Adds the click function for an option to be selected
    button.addEventListener("click", function () {
      const button = document.getElementById("submit-button");
      const elementError = document.getElementById("no-answer");
      elementError.setAttribute("hidden", "");
      elementError.setAttribute("inert", "");

      button.classList.remove("inactive");

      const fieldset = document.getElementById("wrapper-button-choice");

      const previousName = fieldset.dataset.choice;

      if (previousName) {
        const previous = document.getElementById(previousName);

        previous.dataset.selected = "false";
      }

      fieldset.dataset.choice = this.id;

      this.dataset.selected = "true";

      submit.removeAttribute("inert");
    });
  }

  assignButtonSubmitAnswer();
}

// Assigns the function for submitting answer
function assignButtonSubmitAnswer() {
  const button = document.getElementById("submit-button");
  button.removeEventListener("click", loadQuestion);
  button.addEventListener("click", markAnswerSubmitted);
  button.innerHTML = "Submit Answer";
}

// Checks whether: there is an answer, if the answer is correct, show correct answer when the chose answer is wrong,
function markAnswerSubmitted() {
  const elementChoiceName = document.getElementById("wrapper-button-choice")
    .dataset.choice;

  if (!elementChoiceName) {
    const button = document.getElementById("submit-button");
    const elementError = document.getElementById("no-answer");
    elementError.removeAttribute("hidden");
    elementError.removeAttribute("inert");
    button.classList.add("inactive");
    return;
  }

  const allChoices = document.querySelectorAll(".button-choice");

  const answer = questionsArray[current].answer;

  let elementAnswer;

  allChoices.forEach((element) => {
    element.setAttribute("inert", "");
    if (element.value === answer) {
      elementAnswer = element;
    }
  });

  const elementChoice = document.getElementById(elementChoiceName);

  const choice = elementChoice.value;

  elementAnswer.classList.add("correct");

  const elementCorrectImage = document.createElement("img");
  elementCorrectImage.setAttribute("src", "../assets/images/icon-correct.svg");
  elementCorrectImage.setAttribute("alt", "icon correct");

  elementAnswer.appendChild(elementCorrectImage);

  if (choice === answer) {
    score++;
  } else {
    elementChoice.classList.add("wrong");

    const elementIncorrectImage = document.createElement("img");
    elementIncorrectImage.setAttribute(
      "src",
      "../assets/images/icon-incorrect.svg"
    );
    elementIncorrectImage.setAttribute("alt", "icon incorrect");

    elementChoice.appendChild(elementIncorrectImage);
  }

  current++;

  const percent = (current / questionsArray.length) * 100;

  updateFunctionForButtonSubmitAnswer(current);

  updateProgressBar(percent);
}

// Switches the button functions to non-interactible, load next question, depending on the chosen answer, and switches to loading score page when there are no questions left
function updateFunctionForButtonSubmitAnswer() {
  const button = document.getElementById("submit-button");

  if (current < 10) {
    button.innerHTML = "Next Question";
    button.removeEventListener("click", markAnswerSubmitted);
    button.addEventListener("click", loadQuestion);
  } else {
    button.innerHTML = "Check Score";
    button.removeEventListener("click", markAnswerSubmitted);
    button.addEventListener("click", () => {
      window.location = `./score-page.html?score=${score}&key=${key}&theme=${sendThemePageExit()}`;
    });
  }
}

// Handles the display for progress bar
function updateProgressBar(percent) {
  const bar = document.getElementById("bar-progress");
  bar.style.setProperty("--progress", `${percent}%`);
}
