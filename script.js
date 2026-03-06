// Экраны
const startBtn=document.getElementById("startBtn");
const nextQuestion=document.getElementById("nextQuestion");
const gameNext=document.getElementById("gameNext");
const startScreen=document.getElementById("start");
const questionScreen=document.getElementById("questions");
const gameScreen=document.getElementById("game");
const finalScreen=document.getElementById("final");
const answerDivs=document.querySelectorAll(".answer");
const cardsContainer=document.querySelector(".cards");
const movesDisplay=document.getElementById("moves");

// Fade между экранами
function showScreen(hide,show){
    hide.classList.add("hidden");
    show.classList.remove("hidden");
}

// Старт
startBtn.onclick = ()=>{ showScreen(startScreen,questionScreen); };

// Опрос
answerDivs.forEach(answer=>{
    answer.onclick = ()=>{
        answer.classList.toggle("open");
        const heart = answer.querySelector(".heart-empty");
        heart.textContent = heart.textContent==="♡"?"❤️":"♡";
        const box = answer.querySelector(".box");
        box.textContent = answer.dataset.text;
    };
});
nextQuestion.onclick = ()=>{ showScreen(questionScreen,gameScreen); createGame(); };

// Игра
const words=["❤️","❤️","💖","💖","💗","💗","💘","💘","💝","💝","🐻","🐻"];
let firstCard=null, secondCard=null, lock=false, matched=0, moves=0;

function shuffle(array){ return array.sort(()=>Math.random()-0.5); }

function createGame(){
    moves=0; matched=0;
    movesDisplay.textContent=moves;
    gameNext.classList.add("hidden");
    cardsContainer.innerHTML="";
    const shuffled=shuffle(words);

    shuffled.forEach(word=>{
        const card=document.createElement("div");
        card.classList.add("card");
        const inner=document.createElement("div");
        inner.classList.add("card-inner");
        inner.innerHTML=`<div class="card-front">?</div><div class="card-back">${word}</div>`;
        card.appendChild(inner);
        cardsContainer.appendChild(card);

        card.onclick=()=>{
            if(lock || card.classList.contains("flipped") || card.classList.contains("correct")) return;
            moves++;
            movesDisplay.textContent=moves;

            card.classList.add("flipped","active"); // розовый

            if(!firstCard){ firstCard=card; return; }
            secondCard=card; lock=true;

            const firstWord=firstCard.querySelector(".card-back").textContent;
            const secondWord=secondCard.querySelector(".card-back").textContent;

            if(firstWord===secondWord){
                setTimeout(()=>{
                    firstCard.classList.remove("active"); 
                    secondCard.classList.remove("active");
                    firstCard.classList.add("correct");
                    secondCard.classList.add("correct");
                    firstCard=null; secondCard=null; lock=false; matched++;
                    if(matched===6) gameNext.classList.remove("hidden");
                },300);
            } else {
                setTimeout(()=>{
                    firstCard.classList.remove("flipped","active");
                    secondCard.classList.remove("flipped","active");
                    firstCard=null; secondCard=null; lock=false;
                },800);
            }
        };
    });
}
gameNext.onclick = ()=>{ showScreen(gameScreen,finalScreen); };

// Летающие сердечки
const heartsContainer=document.querySelector(".hearts");
const hearts=["❤️","💗","💖","💘","💝","💓","💞","🐻"];
function createHeart(){
    const heart=document.createElement("div");
    heart.classList.add("heart");
    heart.innerText=hearts[Math.floor(Math.random()*hearts.length)];
    heart.style.left=Math.random()*100+"%";
    heart.style.fontSize=Math.random()*20+20+"px";
    heart.style.animationDuration=Math.random()*3+4+"s";
    heartsContainer.appendChild(heart);
    setTimeout(()=>heart.remove(),7000);
}
setInterval(createHeart,300);