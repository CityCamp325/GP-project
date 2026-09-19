
/* ========================================
   FLASHCARD FUNCTION
======================================== */

function flipCard(card) {
    card.classList.toggle("flipped");

    // Google Analytics: flashcard flip event
    if (typeof gtag === "function") {
        gtag("event", "flashcard_flip", {
            event_category: "engagement",
            event_label: "Flashcard flipped"
        });

        console.log("Flashcard event sent: 1");
    }
}

/* ========================================
   STORE LIKE FUNCTION
======================================== */

function likeStore(storeId, button) {
    const likedKey = "medicineStoreLiked_" + storeId;

    // Prevent liking more than once
    if (localStorage.getItem(likedKey) === "true") {
        return;
    }

    // Mark as liked
    localStorage.setItem(likedKey, "true");

    // Send Google Analytics event only once
    if (typeof gtag === "function") {
        gtag("event", "store_like", {
            store_id: storeId
        });

        console.log("Store like event sent:", storeId);
    }

    // Update button appearance
    button.classList.add("liked");
    button.disabled = true;
}

/* ========================================
   QUIZ VARIABLES
======================================== */

let score = 0;
let answeredQuestions = 0;

const totalQuestions =
    document.querySelectorAll(".quiz-question").length;

/* ========================================
   CHECK ANSWER
======================================== */

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

        feedback.textContent =
            "Incorrect. The correct answer is highlighted.";

        // Highlight correct answer
        const correctChoice = question.querySelector(".correct");

        if (correctChoice) {
            correctChoice.classList.add("correct-answer");
        }
    }

    answeredQuestions++;

    // Update progress counter
    document.getElementById("progress-counter").textContent =
        `Progress: ${answeredQuestions}/${totalQuestions} questions answered`;

    // Google Analytics: quiz answer event
    if (typeof gtag === "function") {
        gtag("event", "quiz_answer", {
            event_category: "engagement",
            event_label: "Question " + answeredQuestions,
            answer_correct: isCorrect
        });
    }

    // Show final score
    if (answeredQuestions === totalQuestions) {
        showFinalScore();
    }
}

/* ========================================
   DISPLAY FINAL SCORE
======================================== */

function showFinalScore() {
    const finalResult = document.getElementById("final-result");
    const finalScore = document.getElementById("final-score");

    finalScore.textContent =
        `Your score: ${score}/${totalQuestions}`;

    finalResult.style.display = "block";

    // Google Analytics: quiz completed
    if (typeof gtag === "function") {
        gtag("event", "quiz_completed", {
            event_category: "engagement",
            event_label: "Quiz completed",
            score: score
        });
    }
}

/* ========================================
   RESTART QUIZ
======================================== */

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

            choice.classList.remove(
                "correct-answer",
                "wrong-answer"
            );
        });

        const feedback = question.querySelector(".feedback");

        if (feedback) {
            feedback.textContent = "";
        }
    });
}
