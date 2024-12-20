const questions = [
    {
        question: "What is the capital of India?",
        answers: [
            { text:"Mumbai", correct: false},
            { text:"Kolkata", correct: false},
            { text:"Delhi", correct: true},
            { text:"Chennai", correct: false},
        ]
    },
    {
        question: "In which year Delhi became the capital of India?",
        answers: [
            { text:"1903", correct: false},
            { text:"1911", correct: true},
            { text:"1917", correct: false},
            { text:"1915", correct: false},
        ]
    },
    {
        question:  "Multiplication of 2*2*2*2 ?",
        answers: [
            { text:"14", correct: false},
            { text:"15", correct: false},
            { text:"16", correct: true},
            { text:"18", correct: false},
        ]
    },
    {
        question: "Which is the largest planet in our solar system?",
        answers: [
            { text:"Mars", correct: false},
            { text:"Jupiter", correct: true},
            { text:"Earth", correct: false},
            { text:"Saturn", correct: false},
        ]
    },
    {
        question: "Who is the national bird of India?",
        answers: [
            { text:"Pigeon", correct: false},
            { text:"Flamingo", correct: false},
            { text:"Eagle", correct: false},
            { text:"Peacock", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currQuestionIndex];
    let questionNo = currQuestionIndex + 1;
    questionElement.innerHTML = questionNo +"." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button =document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display ="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}    

function selectAnswer(e){
    const selectbtn = e.target;
    const isCorrect = selectbtn.dataset.correct === "true";
    if(isCorrect){
        selectbtn.classList.add("correct");
        score++;
    }else{
        selectbtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currQuestionIndex++;
    if(currQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () =>{
    if(currQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
