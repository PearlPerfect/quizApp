const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false},
            { text: "Blue Whale", correct: true},
            { text: "Elephant", correct: false},
            { text: "Giraffe", correct: false},
        ]
    },
    {
        question: "What is the capital of france?",
        answers: [
            { text: "Paris", correct: true},
            { text: "Madrid", correct: false},
            { text: "London", correct: false},
            { text: "Rome", correct: false},
        ]
    },
    {
        question: "Which planet is known as the 'Red planet'?",
        answers: [
            { text: "Venus", correct: false},
            { text: "Mars", correct: true},
            { text: "Saturn", correct: false},
            { text: "Jupiter", correct: false},
        ]
    },
    {
        question: "Which planet is known as the 'morning star'?",
        answers: [
            { text: "Venus", correct: false},
            { text: "Mercury", correct: true},
            { text: "Saturn", correct: false},
            { text: "Jupiter", correct: false},
        ]
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: [
            { text: "Pablo Picasso", correct: false},
            { text: "Leonardo da Vinci", correct: true},
            { text: "Vincent van Gogh", correct: false},
            { text: "Michelangelo", correct: false},
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            { text: "Asia", correct: false},
            { text: "Africa", correct: false},
            { text: "Arctic", correct: false},
            { text: "Australia", correct: true},
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            { text: "Bhustan", correct: false},
            { text: "Shri Lanka", correct: false},
            { text: "Vatican City", correct: true},
            { text: "Nepal", correct: false},
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            { text: "Shara desert", correct: false},
            { text: "Kalahari desert", correct: false},
            { text: "Gobi desert", correct: false},
            { text: "Antarctica desert", correct: true},
        ]
    },
    {
        question: "Which country is known as the lion of Africa?",
        answers: [
            { text: "Nigeria", correct: true},
            { text: "Ghana", correct: false},
            { text: "South Africa", correct: false},
            { text: "Togo", correct: false},
        ]
    }
]

const eachQuestion = document.getElementById("questions");
const options = document.getElementById("answers");
const nextQuestion = document.getElementById("nextQuestion");

let questionIndex = 0;
let scores = 0;

function startQuiz(){
    questionIndex = 0;
    scores = 0;
    nextQuestion.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState()
    let currentQuestion = questions[questionIndex];
    let questionNumber = questionIndex + 1;
    eachQuestion.innerHTML = questionNumber + "." + currentQuestion.question


    // to display questions
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        options.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct; //this adds the true or false value to the correct.
        }

        //actions on the options when clicked

        button.addEventListener("click", selectedOption)
    });
}

//to remove the default options
function resetState(){
    nextQuestion.style.display ="none";
    while (options.firstChild){
        options.removeChild(options.firstChild)
    }
}


function selectedOption(event){
    const selectOption = event.target;
    const correctOption = selectOption.dataset.correct === "true"
    if (correctOption){
        selectOption.classList.add("correct");
        scores++;
    }

    else{
        selectOption.classList.add("incorrect");
    }

    //disable more than one click and automatically show the right answer answer if chosen answer is wrong
    Array.from(options.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextQuestion.style.display = "block"
}

function showScore(){
    resetState();
    options.innerHTML = `You Scored ${scores} out of ${questions.length}!`;
    nextQuestion.innerHTML = "Retake test"
    nextQuestion.style.display = "block"
}

function showNextQuestion(){
    questionIndex++;
    if(questionIndex < questions.length){
        showQuestion();
   }
   else{
    showScore();
   }
}
nextQuestion.addEventListener("click", () =>{
    if(questionIndex < questions.length){
        showNextQuestion()
   }
   else{
       startQuiz();
   }
});


startQuiz();