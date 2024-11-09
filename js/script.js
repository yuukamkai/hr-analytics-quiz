// js/script.js
const questions = [
    {
        question: "Which metric is commonly used to measure employee turnover?",
        options: [
            "Revenue per employee",
            "Attrition rate",
            "Training expenses",
            "Overtime hours"
        ],
        correctAnswer: 1
    },
    {
        question: "What does engagement rate measure in HR analytics?",
        options: [
            "Social media activity",
            "Time spent in meetings",
            "Employee participation and satisfaction",
            "Email response time"
        ],
        correctAnswer: 2
    },
    {
        question: "Which analysis method helps predict future hiring needs?",
        options: [
            "Workforce forecasting",
            "Performance reviews",
            "Benefits analysis",
            "Compensation benchmarking"
        ],
        correctAnswer: 0
    }
];

let currentQuestion = 0;
let score = 0;
let timeElapsed = 0;
let timerInterval;

// Get DOM elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const startButton = document.getElementById('start-btn');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const timerElement = document.getElementById('timer');
const questionCountElement = document.getElementById('question-count');

// Add event listeners
startButton.addEventListener('click', startQuiz);

function startQuiz() {
    startScreen.classList.add('hide');
    quizScreen.classList.remove('hide');
    startTimer();
    showQuestion();
}

function showQuestion() {
    resetAnswerButtons();
    const question = questions[currentQuestion];
    questionElement.textContent = question.question;
    questionCountElement.textContent = `Question: ${currentQuestion + 1}/${questions.length}`;
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => selectAnswer(index));
        answerButtonsElement.appendChild(button);
    });
}

function resetAnswerButtons() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(index) {
    const correct = index === questions[currentQuestion].correctAnswer;
    if (correct) score++;
    
    if (currentQuestion + 1 < questions.length) {
        currentQuestion++;
        showQuestion();
    } else {
        endQuiz();
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeElapsed++;
        const minutes = Math.floor(timeElapsed / 60);
        const seconds = timeElapsed % 60;
        timerElement.textContent = `Time: ${minutes}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

function endQuiz() {
    clearInterval(timerInterval);
    quizScreen.classList.add('hide');
    resultsScreen.classList.remove('hide');
    
    const scoreElement = document.getElementById('score');
    const timeElement = document.getElementById('time-taken');
    const passFailElement = document.getElementById('pass-fail');
    
    const percentage = (score / questions.length) * 100;
    scoreElement.textContent = `Score: ${score}/${questions.length} (${percentage}%)`;
    timeElement.textContent = `Time taken: ${Math.floor(timeElapsed / 60)}:${(timeElapsed % 60).toString().padStart(2, '0')}`;
    passFailElement.textContent = percentage >= 70 ? 'PASSED!' : 'Try again!';
    
    const retryButton = document.getElementById('retry-btn');
    retryButton.addEventListener('click', resetQuiz);
}

function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    timeElapsed = 0;
    resultsScreen.classList.add('hide');
    startScreen.classList.remove('hide');
}