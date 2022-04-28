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
card.onclick=flipCard
card.classList.add("hidden")
}
// debugger
let twoCards=[]
function flipCard(event){
    console.log(event.target);
    event.target.classList.remove("hidden")
    twoCards.push(event.target);
    if (twoCards[1]!=undefined&&isEqual(twoCards)){
        event.target.classList.remove("card");
        event.target.textContent="";
        twoCards[0].classList.remove("card");
        twoCards[0].textContent="";
        twoCards=[]
    }
    if (twoCards[1]!=undefined&&isEqual(twoCards)==0){
        setTimeout(()=>{twoCards[0].classList.add("hidden")},500);
        setTimeout(()=>{twoCards[1].classList.add("hidden")},500);
        setTimeout(()=>{twoCards=[]},550);
    }
}
function isEqual(twoCards){
    return  (twoCards[0].textContent==twoCards[1].textContent);
}