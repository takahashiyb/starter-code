const query = window.location.search;

const params = new URLSearchParams(query);

const key = params.get("key");
const theme = params.get("theme");

let current = 0;

let questionsArray = [];

let score = 0;

loadPage();

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

      console.log(object);

      const title = document.querySelector("h1");

      title.innerHTML = object.title;

      const titleImage = document.querySelector(".header-page img");

      titleImage.src = `.${object.icon}`;

      const questions = object.questions;

      const copyQuestions = [...questions];

      questionsArray = shuffle(copyQuestions);
    })
    .then(() => {
      loadQuestion();
      assignButtonSubmitAnswer();
    });
}

function loadQuestion() {
  const indicatorCurrent = document.getElementById("question-current");
  indicatorCurrent.innerHTML = current + 1;

  const indicatorTotal = document.getElementById("question-count");
  indicatorTotal.innerHTML = questionsArray.length;

  const questionDetail = document.querySelector("h2");
  questionDetail.innerHTML = questionsArray[current].question;

  const options = questionsArray[current].options;

  let copyOptions = [...options];

  copyOptions = shuffle(copyOptions);

  for (let i = 0; i < 4; i++) {
    const fieldset = document.getElementById("wrapper-button-choice");

    fieldset.dataset.choice = "";

    const button = document.getElementById(`button-choice-${i}`);

    button.value = copyOptions[i];

    button.dataset.selected = "false";

    const info = document.querySelector(`#button-choice-${i} .choice-info`);
    info.innerHTML = copyOptions[i];

    const submit = document.getElementById("submit-button");

    submit.setAttribute("inert", "");

    button.addEventListener("click", function () {
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
}

function assignButtonSubmitAnswer() {
  const button = document.getElementById("submit-button");
  button.addEventListener("click", () => {
    const elementChoiceName = document.getElementById("wrapper-button-choice")
      .dataset.choice;

    const choice = document.getElementById(elementChoiceName).value;

    const answer = questionsArray[current].answer;

    if (choice === answer) {
      score++;
    }

    current++;
    if (current < 10) {
      loadQuestion();
    } else {
      window.location = `./score-page.html?score=${score}`;
    }
  });
}
