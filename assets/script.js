const start_btn = document.querySelector(".start_btn button");
const quiz_box = document.querySelector(".quiz_box");
const high_score = document.querySelector(".highscores");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const score_box = document.querySelector(".highScore_box");

const option_list = document.querySelector(".option_list");

start_btn.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show the quiz box
    startTimer();
    next_btn.click();
};

let time = 30;
let que_count = -1;
let counter;

const next_btn = quiz_box.querySelector(".next_btn");
const highScore_btn = document.querySelector(".highscore_btn");
const results_box = document.querySelector(".result_box");
const restart_quiz = score_box.querySelector(".replay");

restart_quiz.onclick = ()=>{
    window.location.reload();
};

next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){
        que_count++;
        next_btn.style.display = "none";
        showQuestions(que_count);
    } else {
        console.log("Questions completed");
        showResultBox();
    }
};

high_score.onclick = ()=>{
    score_box.classList.add("activeScore");
};

function showQuestions(index) {
        const que_text = document.querySelector(".que_text");
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let choice_tag = '<div class="option"><span>'+ questions[index].choices[0] +'</span></div>'
                    + '<div class="option"><span>'+ questions[index].choices[1] +'</span></div>'
                    + '<div class="option"><span>'+ questions[index].choices[2] +'</span></div>'
                    + '<div class="option"><span>'+ questions[index].choices[3] +'</span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = choice_tag;
    
    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    };
};

function optionSelected(answer) {
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    if(userAns == correctAns) {
        answer.classList.add("correct");
        console.log("Answer is correct");
    } else {
        answer.classList.add("incorrect");
        time -= 5;
        console.log("Answer is incorrect");

        for (let i = 0; i < allOptions; i++) {
            if(option_list.children[i].textContent == correctAns){
                option_list.children[i].setAttribute("class", "option correct")
            }
        }
    }

    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disable");
    }
    next_btn.style.display = "block";
};

function showResultBox(){
    quiz_box.classList.remove("activeQuiz");
    results_box.classList.add("activeResult");
    const scoreText = results_box.querySelector(".score_text");
    if(time > 0){
        let scoreTag = '<span>Your score is <p>'+ time + '</p> seconds.</span>';
        scoreText.innerHTML = scoreTag;
    } else {
        let scoreTag = '<span>You exceded the time alloted. Your score is <p>'+ time + '</p> seconds. </span>';
        scoreText.innerHTML = scoreTag;
    }
};

function startTimer(){
    counter = setInterval(timer, 1000);
    function timer(){
        console.log(time);
        timeCount.textContent = time;
        time--;
        if(time < 0 || que_count >= questions.length -1){
            clearInterval(counter);
            console.log("Your time is up")
        }
    }
};

highScore_btn.onclick = ()=>{
    results_box.classList.remove("activeResult");
    scoreDisplay();
    score_box.classList.add("activeScore");
}

function scoreDisplay(){
    let scoreInput = document.querySelector("#score_input").value;
    const scoresFromLocalStorage = JSON.parse(window.localStorage.getItem("newUserScore")) || [];
    let newUserScore = {
        newScore: time,
        playerName: scoreInput,
    };

    scoresFromLocalStorage.push(newUserScore)
    window.localStorage.setItem("newUserScore", JSON.stringify(scoresFromLocalStorage));
    
    listHighScores()
}

function listHighScores(){
    const localStorage = JSON.parse(window.localStorage.getItem("newUserScore")) || [];
    
    localStorage.sort(function(a, b){
        return b.score - a.score
    });
    localStorage.forEach (score =>{
        const listItem = document.createElement ("li");
        listItem.textContent = score.playerName + ": " + score.newScore;
        const topHighScores = document.querySelector("#top_high_scores");

        topHighScores.appendChild(listItem);
    });
}

