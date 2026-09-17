function flipCard(card) {
  card.classList.toggle("flipped");
}

function checkAnswer(selectedChoice, isCorrect) {
  const question = selectedChoice.closest(".quiz-question");
  const choices = question.querySelectorAll(".choice");
  const feedback = question.querySelector(".feedback");

  choices.forEach(choice => {
    choice.disabled = true;
  });

  if (isCorrect) {
    selectedChoice.classList.add("correct-answer");
    feedback.textContent = "Correct!";
    feedback.className = "feedback correct-feedback";
  } else {
    selectedChoice.classList.add("wrong-answer");
    feedback.textContent = "Incorrect. Review the learning material.";
    feedback.className = "feedback wrong-feedback";
    question.querySelector(".correct").classList.add("correct-answer");
  }
}
