let currentquestion=0;
let score=0;
let highscores=0;
let userName="";
let quizdata=[];
let selectedoption="";
async function loadquizdata(){
    const res=await fetch("quizdata.json");
    quizdata= await res.json();
    console.log("quizdata>>>",quizdata);
    loadquestion();
}
function loadquestion(){
    console.log("current question",quizdata[currentquestion])
    const questionobj=quizdata[currentquestion];
    document.getElementById("question").innerText=questionobj.question;
    for(let i=0;i<4;i++){
        const btn=document.getElementById(`btn${i}`);
        btn.innerText=questionobj.options[i];
        btn.className="option-btn";
        btn.style.opacity=1;
        btn.disabled=false;
        btn.style.cursor="default";
    }
    document.getElementById("message").innerText="";
    document.getElementById("next-btn").style.display="none";
}
function startquiz(){
    userName=prompt("enter username");
    if(userName){
        document.getElementById("username").innerText=userName;
        document.getElementById("start-page").style.display="none";
        document.getElementById("quiz-container").style.display="block";
        loadquizdata();
    }
    else{
        alert("please enter username");
    }
}
document.getElementById("start-btn").addEventListener("click",startquiz);
for(let i=0;i<4;i++){
    document.getElementById(`btn${i}`).addEventListener("click",(event)=>{
    const selectedoption=event.target;
    console.log("select>>>",selectedoption)
    if(quizdata[currentquestion].answer==selectedoption.innerText){
        console.log("correct");
        score++;
        document.getElementById("score").innerText=score;
        selectedoption.className="correct";
        document.getElementById("message").innerText="correct answer";
    }
    else{
        console.log("wrong");
        selectedoption.className= "wrong";
        document.getElementById("message").innerText="wrong answer";
    }
    for(let j=0;j<4;j++){
        document.getElementById(`btn${j}`).disabled="true";
        document.getElementById(`btn${j}`).style.opacity=0.5;
        document.getElementById(`btn${j}`).style.cursor="not-allowed";
    }
    selectedoption.style.opacity=1;
    document.getElementById("next-btn").style.display="block";
    });
}
document.getElementById("next-btn").addEventListener("click",(event)=>{
    currentquestion++;
if(currentquestion<quizdata.length){
loadquestion();
const progress=(currentquestion/quizdata.length)*100;
document.getElementById("progress-bar-text").innerText=`${Math.round(progress)}%`;
}
else{
    endquiz();
}
});
function endquiz(){
    document.getElementById("quiz-container").style.display="none";
    document.getElementById("score-container").style.display="block";
    document.getElementById("score-text").innerText=score;
    currentquestion=0;
 score=0;
  highscores=0;
 userName="";
 quizdata=[];
  selectedoption="";
  const progress=(currentquestion/quizdata.length)*100;
 document.getElementById("progress-bar-text").innerText=`${Math.round(progress)}%`;
 }
document.getElementById("restart-quiz").addEventListener("click",(event)=>{
    document.getElementById("start-page").style.display="block";
    document.getElementById("score-container").style.display="none";
})