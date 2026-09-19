
// ========================================
// FLASHCARD FUNCTION
// ========================================

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



// ========================================
// STORE LIKE FUNCTIONS
// ========================================

function likeStore(storeId, button) {

    const storageKey = "medicineStoreLikes_" + storeId;

    const likedKey = "medicineStoreLiked_" + storeId;


    let likes = Number(localStorage.getItem(storageKey)) || 0;

    let alreadyLiked = localStorage.getItem(likedKey) === "true";


    if (alreadyLiked) {

        likes = Math.max(0, likes - 1);

        localStorage.setItem(storageKey, likes);

        localStorage.setItem(likedKey, "false");

        button.classList.remove("liked");

        button.querySelector("span:last-child").textContent = "Like Store";


    } else {

        likes++;

        localStorage.setItem(storageKey, likes);

        localStorage.setItem(likedKey, "true");

        button.classList.add("liked");

        button.querySelector("span:last-child").textContent = "Liked ✓";


        // Google Analytics: store like event

        if (typeof gtag === "function") {

            gtag("event", "store_like", {

                event_category: "engagement",

                event_label: storeId

            });

            console.log("Store like event sent:", storeId);

        }

    }


    updateLikeCount(storeId, likes);

}



// ========================================
// UPDATE LIKE COUNT
// ========================================

function updateLikeCount(storeId, likes) {

    const countElement = document.getElementById("likes-" + storeId);

    if (countElement) {

        countElement.textContent = likes;

    }

}



// ========================================
// LOAD STORE LIKES
// ========================================

function loadStoreLikes() {

    const storeIds = [

        "zhaoxing-store",

        "local-store-2"

    ];


    storeIds.forEach(function(storeId) {

        const storageKey = "medicineStoreLikes_" + storeId;

        const likedKey = "medicineStoreLiked_" + storeId;


        const likes = Number(localStorage.getItem(storageKey)) || 0;

        const alreadyLiked = localStorage.getItem(likedKey) === "true";


        updateLikeCount(storeId, likes);


        const buttons = document.querySelectorAll(".like-button");


        buttons.forEach(function(button) {

            const onclickValue = button.getAttribute("onclick") || "";


            if (onclickValue.includes("'" + storeId + "'")) {

                if (alreadyLiked) {

                    button.classList.add("liked");

                    button.querySelector("span:last-child").textContent = "Liked ✓";

                }

            }

        });

    });

}



// ========================================
// QUIZ VARIABLES
// ========================================

let score = 0;

let answeredQuestions = 0;


const totalQuestions =

    document.querySelectorAll(".quiz-question").length;



// ========================================
// CHECK ANSWER
// ========================================

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

            event_label: "Question " + (answeredQuestions),

            answer_correct: isCorrect

        });

    }


    // Show final score

    if (answeredQuestions === totalQuestions) {

        showFinalScore();

    }

}



// ========================================
// DISPLAY FINAL SCORE
// ========================================

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



// ========================================
// RESTART QUIZ
// ========================================

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



// ========================================
// INITIALISE WEBSITE
// ========================================

window.addEventListener("DOMContentLoaded", function() {

    loadStoreLikes();

});