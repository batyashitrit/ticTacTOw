let cards=[] //["A","B","C","D","E","F"]
let HowManyCards=prompt("How many cards do you want to play with?")
while(HowManyCards%2){
    HowManyCards=prompt("Number of cards must be double. Please try again.")
}

for (let index = 0; index < HowManyCards/2; index++) { //לבחירת מספר קלפים
    const element = String.fromCharCode(97+index);
    cards.push(element.toUpperCase());
}
 
function shuffle(cards){ //פונקציה לערבוב הקלפים
    let cardNew=cards.concat(cards);
    let cards2=[...cardNew];
    let shuffleArr=[];
    for(i in cardNew){
        let index=Math.floor(Math.random()*cards2.length);
        shuffleArr.push(cards2[index]); 
         cards2.splice(index,1);
        }
        console.log(shuffleArr);
        return shuffleArr
    }
let cardShuffled=shuffle(cards);   

let board=document.getElementById("gameTable");
let p_table=document.getElementById("p_table");

for(n of cardShuffled){ //יצירת הקלפים על הלוח
let card=document.createElement("div");
card.textContent = n;
card.className="card";
board.appendChild(card);
card.onclick=flipCard
card.classList.add("hidden")
}
// debugger
let twoCards=[]

let players=[];
let playersNumber=prompt("how many players?"); //יצירת רשימת שחקנים
while (playersNumber<2){
    playersNumber=prompt("players must be bigger than 1. please try again.")
}
for(let counter=1; counter<=playersNumber; counter++){
    let player=document.createElement("th");
    player.name= prompt('insert player '+ counter+"'s name"); 
    player.score=0;
    player.innerText=player.name+": " + player.score;
    player.className="player";
    p_table.appendChild(player);
    players.push(player);
}

// let playerA=document.getElementById("a"); //מקרה של שני שחקנים בלבד
// let playerB=document.getElementById("b");
// playerA.classList.add("playerNow")

// let players=[];
// players[1]=playerA;
// players[-1]=playerB;
let a=0
let turNow=players[a]
players[0].classList.add("playerNow");

// let a_score=0, b_score=0
// let playerA_name=prompt("insert player A's name")
// let playerB_name=prompt("insert player B's name")
// let a_score=0, b_score=0
// playerA.innerText=playerA_name+": " + a_score
// playerB.innerText=playerB_name+": " + b_score
let winsCounter=0;

function flipCard(event){
    console.log(event.target);
    event.target.classList.remove("hidden")
    twoCards.push(event.target);
    if (twoCards[1]!=undefined&&isEqual(twoCards)){ //כשהקלפים שווים
        setTimeout(()=>{event.target.classList.remove("card");
                        event.target.classList.add("match");
                        event.target.textContent="";
                        twoCards[0].classList.remove("card");
                        twoCards[0].classList.add("match");
                        twoCards[0].textContent="";
                        twoCards=[];
                        turNow.score++;
                        turNow.innerText=turNow.name+": " + turNow.score;
                        // if (turNow==playerA){
                        //     a_score++;
                        //     playerA.innerText=playerA_name+": " + a_score}
                        // else{
                        //     b_score++;
                        //     playerB.innerText=playerB_name+": " + b_score};
                    //     winsCounter++;
                    // if (winsCounter==HowManyCards/2) {
                    // let win=document.createElement("img")
                    // win.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7iFzZUiobmxMRK0Q19dxn8p3mYwFZl_KRkw&usqp=CAU";
                    // win.classList.ad("win");    
                    // board.appendChild(win);
                // }
                    },500);
    }
    
    if (twoCards[1]!=undefined&&isEqual(twoCards)==0){ //כשהקלפים לא שווים
        setTimeout(()=>{twoCards[0].classList.add("hidden")
                        twoCards[1].classList.add("hidden");
                        twoCards=[];    
                        // players[a].classList.remove("playerNow");
                        // a*=-1;
                        // players[a].classList.add("playerNow");
                        // turNow=players[a];    
                        turNow.classList.remove("playerNow")
                        if(a==playersNumber-1){
                        a=0;
                        }
                        else{a++};
                        turNow=players[a];
                        players[a].classList.add("playerNow");
                    },500);

    }
}
function isEqual(twoCards){
    return  (twoCards[0].textContent==twoCards[1].textContent);
}