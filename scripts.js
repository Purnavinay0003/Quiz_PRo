// DOM elements
const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const continueBtn = document.querySelector('.continue-btn');
const main = document.querySelector('.main');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const questionText = document.querySelector('.question-text');
const optionList = document.querySelector('.option-list');
const nextBtn = document.querySelector('.next-btn');
const scoreDisplay = document.querySelector('.header-score');

let currentQuestionIndex = 0;
let score = 0;

// Function to update the score display
function updateScore() {
    scoreDisplay.textContent = `Score: ${score}/5`;
}

// Function to display questions
function showQuestions(index) {
    const question = questions[index];
    questionText.textContent = `${question.numb}. ${question.question}`;
    optionList.innerHTML = '';

    question.options.forEach(option => {
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('option');
        optionDiv.innerHTML = `<span>${option}</span>`;
        optionDiv.addEventListener('click', () => {
            selectOption(optionDiv, question.answer);
        });
        optionList.appendChild(optionDiv);
    });

    // Disable the next button until an option is selected
    nextBtn.classList.remove('active');
}

// Handle option selection
function selectOption(selectedOption, correctAnswer) {
    const allOptions = optionList.querySelectorAll('.option');
    allOptions.forEach(option => option.classList.remove('selected'));
    selectedOption.classList.add('selected');

    // Compare selected option's text with the correct answer
    if (selectedOption.textContent.trim() === correctAnswer) {
        selectedOption.classList.add('correct');
        score++;
        updateScore(); // Update the score display
    } else {
        selectedOption.classList.add('incorrect');
        // Highlight the correct option
        allOptions.forEach(option => {
            if (option.textContent.trim() === correctAnswer) {
                option.classList.add('correct');
            }
        });
    }

    // Disable all options after selection
    allOptions.forEach(option => option.style.pointerEvents = 'none');

    // Enable the next button after an option is selected
    nextBtn.classList.add('active');
}

// Event listeners
startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('inactive');
};

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('inactive');
};

continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('inactive');
    quizBox.classList.add('active');
    showQuestions(currentQuestionIndex);
};

nextBtn.onclick = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestions(currentQuestionIndex);
    } else {
        // End of quiz logic
        alert(`Quiz Completed! Your score is ${score}`);
        // Optionally, reset the quiz or redirect
        currentQuestionIndex = 0;
        score = 0;
        quizSection.classList.remove('active');
        main.classList.remove('inactive');
        popupInfo.classList.add('active');
        updateScore(); // Reset the score display after quiz completion
    }
};

// Initialize the quiz section
document.addEventListener('DOMContentLoaded', () => {
    quizSection.classList.remove('active');
    updateScore(); // Initialize score display
});

