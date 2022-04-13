let cards=["A","B","C","D","E","F"]

// debugger
function shuffle(cards){
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

for(n of cardShuffled){
let card=document.createElement("div");
card.textContent = n;
card.className="card"
board.appendChild(card);
}


