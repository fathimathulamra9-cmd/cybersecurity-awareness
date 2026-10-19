
const questions = [
  {
    question: "1. Someone asks for your password by email. What should you do?",
    options: [
      "Send the password",
      "Ignore the request and verify through an official channel",
      "Click the email link"
    ],
    correct: 1
  },
  {
    question: "2. Which password practice is safest?",
    options: [
      "Use the same password everywhere",
      "Use your birthday",
      "Use long, unique passwords"
    ],
    correct: 2
  },
  {
    question: "3. What should you do with a suspicious link?",
    options: [
      "Click it immediately",
      "Verify the sender and website address first",
      "Share it with friends"
    ],
    correct: 1
  },
  {
    question: "4. What does multi-factor authentication do?",
    options: [
      "Adds another verification step",
      "Makes every password public",
      "Removes the need for security"
    ],
    correct: 0
  },
  {
    question: "5. How should you handle an unexpected attachment?",
    options: [
      "Open it immediately",
      "Forward it to everyone",
      "Verify it is legitimate before opening"
    ],
    correct: 2
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const quizSection = document.getElementById("quiz");

quizSection.innerHTML = `
  <h2>Test Your Cybersecurity Knowledge</h2>
  <p id="question-count"></p>
  <h3 id="question-text"></h3>
  <div id="quiz-options" class="quiz-options"></div>
  <p id="quiz-result" role="status" aria-live="polite"></p>
  <button id="next-question" class="button" hidden>
    Next Question
  </button>
`;

const count = document.getElementById("question-count");
const questionText = document.getElementById("question-text");
const optionsBox = document.getElementById("quiz-options");
const result = document.getElementById("quiz-result");
const nextButton = document.getElementById("next-question");

function showQuestion() {
  answered = false;
  const q = questions[currentQuestion];

  count.textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;
  questionText.textContent = q.question;
  optionsBox.replaceChildren();
  result.textContent = "";
  nextButton.hidden = true;

  q.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "answer";
    button.textContent = option;

    button.addEventListener("click", () => {
      if (answered) return;
      answered = true;

      if (index === q.correct) {
        score++;
        result.textContent = "Correct! Well done.";
      } else {
        result.textContent =
          "Incorrect. Review the safety advice and learn from it.";
      }

      button.style.borderColor = "#62e6c5";

      Array.from(optionsBox.children).forEach((b) => {
        b.disabled = true;
      });

      nextButton.hidden = false;
      nextButton.textContent =
        currentQuestion === questions.length - 1
          ? "See My Score"
          : "Next Question";
    });

    optionsBox.appendChild(button);
  });
}

nextButton.addEventListener("click", () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion();
  } else {
    showFinalScore();
  }
});

function showFinalScore() {
  count.textContent = "Quiz Completed!";
  questionText.textContent = `Your score: ${score} / ${questions.length}`;
  optionsBox.replaceChildren();

  result.textContent =
    score === questions.length
      ? "Excellent! You answered every question correctly."
      : "Good effort! Review the topics and try again.";

  nextButton.hidden = false;
  nextButton.textContent = "Try Again";

  nextButton.onclick = () => {
    currentQuestion = 0;
    score = 0;
    showQuestion();
  };
}

showQuestion();

const analyzeButton = document.getElementById("analyze-email");
const analysisResult = document.getElementById("email-analysis");

if (analyzeButton && analysisResult) {
  analyzeButton.addEventListener("click", function () {
    analysisResult.replaceChildren();

    const heading = document.createElement("h3");
    heading.textContent = "Warning: Suspicious email detected";
    heading.style.color = "#ff9a9a";

    const explanation = document.createElement("p");
    explanation.textContent =
      "This sample contains warning signs that may indicate phishing:";

    const list = document.createElement("ul");

    const warningSigns = [
      "Urgent language pressuring the reader to act.",
      "A threat that the account will be blocked.",
      "A request to verify account details through an unexpected message.",
      "A verification link whose destination is not provided."
    ];

    warningSigns.forEach(function (warning) {
      const item = document.createElement("li");
      item.textContent = warning;
      list.appendChild(item);
    });

    const tip = document.createElement("p");
    tip.textContent =
      "Safety tip: Visit the official website directly and verify the message through a trusted channel.";

    analysisResult.append(heading, explanation, list, tip);
  });
}

const passwordInput = document.getElementById("password-check");
const passwordButton = document.getElementById("check-password");
const passwordResult = document.getElementById("password-result");

if (passwordInput && passwordButton && passwordResult) {
  passwordButton.addEventListener("click", function () {
    const password = passwordInput.value;
    let feedback = "";

    if (password.length === 0) {
      feedback = "Please enter a sample password.";
    } else if (password.length < 8) {
      feedback = "Weak: use a longer password.";
    } else if (password.length < 14) {
      feedback = "Getting better: try a longer, unique passphrase.";
    } else {
      feedback = "Good length! Make sure it is unique and unpredictable.";
    }

    passwordResult.textContent = feedback;
  });
}
