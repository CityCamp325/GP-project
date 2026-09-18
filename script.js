// Flashcard function
function flipCard(card) {
    card.classList.toggle("flipped");

    const cards = document.querySelectorAll(".flashcard");
    const cardNumber = Array.from(cards).indexOf(card) + 1;

    const isFlipped = card.classList.contains("flipped");

    if (typeof gtag === "function") {
        gtag("event", "flashcard_flipped", {
            flashcard_number: cardNumber,
            action: isFlipped ? "flipped_open" : "flipped_closed"
        });

        console.log("Flashcard event sent:", cardNumber);
    } else {
        console.log("Google Analytics is not loaded.");
    }
}


// Quiz variables
let score = 0;
let answeredQuestions = 0;

const totalQuestions =
    document.querySelectorAll(".quiz-question").length;


// Check answer
function checkAnswer(selectedChoice, isCorrect) {

    const question = selectedChoice.closest(".quiz-question");

    // Prevent answering the same question twice
    if (question.dataset.answered === "true") {
        return;
    }

    question.dataset.answered = "true";

    // Disable all buttons in this question
    const choices = question.querySelectorAll(".choice");

    choices.forEach(choice => {
        choice.disabled = true;
    });

    // Find feedback paragraph
    const feedback = question.querySelector(".feedback");

    if (isCorrect) {
        selectedChoice.classList.add("correct-answer");
        feedback.textContent = "Correct!";
        score++;
    } else {
        selectedChoice.classList.add("wrong-answer");

        feedback.textContent = "Incorrect. The correct answer is highlighted.";

        // Highlight correct answer
        const correctChoice = question.querySelector(".correct");

        if (correctChoice) {
            correctChoice.classList.add("correct-answer");
        }
    }

    answeredQuestions++;

    // Send question data to Google Analytics
    if (typeof gtag === "function") {
        gtag("event", "question_answered", {
            question_number: question.querySelector("h3").textContent,
            correct: isCorrect
        });
    }

    // Update progress counter
    document.getElementById("progress-counter").textContent =
        `Progress: ${answeredQuestions}/${totalQuestions} questions answered`;

    // Show final score
    if (answeredQuestions === totalQuestions) {
        showFinalScore();
    }
}


// Display final score
function showFinalScore() {

    const finalResult = document.getElementById("final-result");
    const finalScore = document.getElementById("final-score");

    finalScore.textContent =
        `Your score: ${score}/${totalQuestions}`;

    finalResult.style.display = "block";
}


// Restart quiz
function restartQuiz() {

    score = 0;
    answeredQuestions = 0;

    // Reset progress
    document.getElementById("progress-counter").textContent =
        `Progress: 0/${totalQuestions} questions answered`;

    // Hide final result
    document.getElementById("final-result").style.display = "none";

    // Reset all questions
    const questions = document.querySelectorAll(".quiz-question");

    questions.forEach(question => {

        question.dataset.answered = "false";

        const choices = question.querySelectorAll(".choice");

        choices.forEach(choice => {
            choice.disabled = false;
            choice.classList.remove("correct-answer", "wrong-answer");
        });

        const feedback = question.querySelector(".feedback");

        if (feedback) {
            feedback.textContent = "";
        }
    });
}
