let Game = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
];
let counter = 0;
let board = document.getElementById("board");
let btnLastMove = document.getElementById("btnLastMove");
let players = [
  { player: "player1", mark: "X" },
  { player: "player2", mark: "O" },
];

let playNaw = players[0];
let rowNum = 3;   // בשביל להגדיל את האורך של המערך הראשי לפי מספר השורות

let arrMuve = [];    //מערך זיכרון למהלכים במשחק


//-------------------------------------------
//   :פונקציית החלפת שחקן
function changePleyer() {
  if (playNaw == players[0]) {
    playNaw = players[1];
  } else {
    playNaw = players[0];
  }
}
//-------------------------------------------

//פונקציית בדיקת שורות
function checkRow() {
  for (c in Game) {
    counter = 0;
    for (let i = 0; i < Game.length - 1; i++) {
      if (Game[c][i] == Game[c][i + 1]) {
        counter++;
        console.log(counter + "row");
        winner();
      }
    }
  }
}
counter = 0;
// -----------------------------------------------

//פונקציית בדיקת עמודות
function checkColumn() {
  for (i in Game) {
    counter = 0;
    for (let c = 0; c < Game.length - 1; c++) {
      if (Game[c][i] == Game[c + 1][i]) {
        counter++;
        console.log(counter + "Column");
        winner()
      }
    }
  }
}

//-------------------------------------------
//1בדיקת אלכסון
function checkSlant1() {
  let d = 0;
  for (let i = 0; i < Game.length - 1; i++) {
    if (Game[i][i] == Game[i + 1][i + 1]) {
      counter++;
      console.log(counter + "Slant1");
      winner()
    }
  }
}

//-------------------------------------------
//2בדיקת אלכסון
function checkSlant2() {
  let e = 0;
  for (let i = 0; i < Game.length-1 ; i++) {
    if (Game[(Game.length-1-i)][i] == Game[(Game.length-2-i)][i+1]) {
      counter++;
      console.log(counter + "Slant2");
      winner()
    }
  }
}

//-------------------------------------------
function findItemInArray(array, item) {
  for (i in Game) {
    for (let c = 0; c < array.length; c++) {
      if (array[i][c] == item) {
        Game[i][c] = playNaw.mark;
        // break;
      }
    }
  }
}


//-------------------------------------------
// פונקציית ניצחון
function winner(){
  if(counter == 2){
    let endMassege = document.createElement("div");
    endMassege.className= ("massege");
    endMassege.innerText = `${playNaw.mark} is the winner`
    board.appendChild(endMassege);
  }
}

//פונקציית כפתור שמוחק מהלך
//עוד לא הספקתי להכין את הפונקצייה
  btnLastMove.onclick = (e) =>{
    alert("hhhh")
  //   square.innerText
  //  arrMuve[length-1]

  } 




//-------------------------------------------
function startGame() {
  for (i in Game) {
    for (let s = 0; s < Game[i].length; s++) {
      let elem = document.createElement("div");
      elem.className = "square";
      board.appendChild(elem);
      elem.id = Game[i][s];

      elem.onclick = (e) => {
        let square = e.target;
        if(square.innerText==""){

          arrMuve.push(square.id);
          console.log(arrMuve);

          console.log(playNaw);
          square.innerText = playNaw.mark; //הכנסת הסימון למשבצת לפי השחקן שמשחק עכשיו
  
          findItemInArray(Game, square.id); //הכנסת סימון של השחקן למיקום הנכון במערך

          checkSlant1();   //בדיקות האם יש ניצחון
          checkSlant2();
          checkRow();
          checkColumn();

          changePleyer();  //תור מתחלף
        }
      }
    }
  }
}

startGame();
