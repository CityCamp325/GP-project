let score = 0;
let answeredQuestions = 0;
const totalQuestions = document.querySelectorAll(".quiz-question").length;

function flipCard(card) {
  card.classList.toggle("flipped");
}

function checkAnswer(selectedChoice, isCorrect) {
  
    const question = selectedChoice.closest(".quiz-question");
    // Prevent answering the same question twice
    if (question.dataset.answered === "true") {
        return;
    }
    question.dataset.answered = "true";
    // Disable all buttons in this question
    const choices = question.querySelectorAll("button");
    choices.forEach(choice => {
        choice.disabled = true;
    });
    if (isCorrect) {
        selectedChoice.classList.add("correct-answer");
        score++;
    } else {
        selectedChoice.classList.add("wrong-answer");
        // Display the correct answer
        choices.forEach(choice => {
          if (choice.classList.contains("correct")) {
            choice.classList.add("correct-answer");
          }
        });
    }
    answeredQuestions++;
    // Update progress counter
    document.getElementById("progress-counter").textContent =
        `Progress: ${answeredQuestions}/${totalQuestions} questions answered`;
    // Show final score when all questions are answered
    if (answeredQuestions === totalQuestions) {
        showFinalScore();
    }
}

function showFinalScore() {
    const finalResult = document.getElementById("final-result");
    const finalScore = document.getElementById("final-score");

    finalScore.textContent =
        `Your score: ${score}/${totalQuestions}`;

    finalResult.style.display = "block";
}
function restartQuiz() {
    score = 0;
    answeredQuestions = 0;
    // Reset progress counter
    document.getElementById("progress-counter").textContent =
        `Progress: 0/${totalQuestions} questions answered`;
    // Hide final score
    document.getElementById("final-result").style.display = "none";
    // Reset all questions
    const questions = document.querySelectorAll(".question");
    questions.forEach(question => {
        question.dataset.answered = "false";
        const choices = question.querySelectorAll("button");
        choices.forEach(choice => {
            choice.disabled = false;
            choice.classList.remove("correct-answer", "wrong-answer");
        });
    });
}
