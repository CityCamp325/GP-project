
// ========================================
// FLASHCARDS
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
// MEDICINE STORE LIKES
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

    likes += 1;

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
// SAVE QUESTIONNAIRE ANSWERS
// ========================================

function saveAnswers() {

  const answers = {

    q1: document.getElementById("q1").value,
    a1: document.getElementById("a1").value,

    q2: document.getElementById("q2").value,
    a2: document.getElementById("a2").value,

    q3: document.getElementById("q3").value,
    a3: document.getElementById("a3").value

  };

  localStorage.setItem(
    "chineseMedicineAnswers",
    JSON.stringify(answers)
  );

  document.getElementById("saved-message").textContent =
    "Your answers have been saved in this browser.";

}


// ========================================
// CLEAR MESSAGE
// ========================================

function clearMessage() {

  document.getElementById("saved-message").textContent = "";

}


// ========================================
// LOAD SAVED ANSWERS
// ========================================

function loadSavedAnswers() {

  const saved = localStorage.getItem("chineseMedicineAnswers");

  if (saved) {

    try {

      const answers = JSON.parse(saved);

      Object.keys(answers).forEach(function(key) {

        const field = document.getElementById(key);

        if (field) {
          field.value = answers[key];
        }

      });

    } catch (error) {

      console.error("Could not load saved answers:", error);

    }

  }

}


// ========================================
// GOOGLE ANALYTICS: QUESTIONNAIRE SAVE
// ========================================

function trackAnswerSave() {

  if (typeof gtag === "function") {

    gtag("event", "questionnaire_save", {
      event_category: "engagement",
      event_label: "Answers saved"
    });

  }

}


// ========================================
// INITIALISE WEBSITE
// ========================================

window.addEventListener("DOMContentLoaded", function() {

  loadSavedAnswers();

  loadStoreLikes();

});
