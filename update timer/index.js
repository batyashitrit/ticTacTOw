

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

let arrMuve = []; //מערך זיכרון למהלכים במשחק
let countMoves1 = { playNum: 1, moves: 0 }; // מונה שסופר מהלכים במשחק
let arrCountMoves2 = []; // מערך שאליו יכנסו שיאי המשחקים
let timeNow;
let arrsaveGame = [] // מערך שיקבל את המשחק השמור


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
        winner();
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
      winner();
    }
  }
}

//-------------------------------------------
//2בדיקת אלכסון
function checkSlant2() {
  let e = 0;
  for (let i = 0; i < Game.length - 1; i++) {
    if (Game[Game.length - 1 - i][i] == Game[Game.length - 2 - i][i + 1]) {
      counter++;
      console.log(counter + "Slant2");
      winner();
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
function winner() {
  if (counter == 2) {
    let endMassege = document.createElement("div");
    endMassege.className = "massege";
    endMassege.id = "endMassege";
    endMassege.innerText = `${playNaw.mark} is the winner`;
    board.appendChild(endMassege);
    // record()
    clearInterval(timeNow)
    upadateRecordAffterWin();
  }
}

//-------------------------------------------

// פונקציית התחלת המשחק מחדש
// כרגע כאשר לוחצים על הפונקציה והמשחק לא נגמר יש שגיאה בקונסול כי הוא לא מוצא איזה הודעה למחוק. כמו כן המשחק לא נספר בתור משחק אם לא הגיעו לניצחון
function resetGame() {
  timerGame()
  Game = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
  ];
  counter = 0;
  let allSqaure = document.querySelectorAll(".square");
  allSqaure.forEach((v) => (v.innerText = ""));
  countMoves1.moves = 0; // מאפס את מספר המהלכים
  let messagaDel = document.getElementById("endMassege");
  messagaDel.parentNode.removeChild(messagaDel);
  
}

//-------------------------------------------

//פונקציית כפתור שמוחק מהלך
//עוד לא הספקתי להכין את הפונקצייה
// btnLastMove.onclick = (e) =>{
//   alert("hhhh")
// //   square.innerText
//  arrMuve[length-1]

// }

//-------------------------------------------

function upadateRecordAffterWin() {
  arrCountMoves2.push(Object.assign({}, countMoves1));
  countMoves1.moves = 0;
  countMoves1.playNum++;
}

//-------------------------------------------

//שיניתי את הכפתורים לדף html ופה נשאר האונקליק שאני מתלבטת איפה לשים אותו
function buildButton() {
  newGameButton.onclick = () => {
    resetGame();
  };
}

//-------------------------------------------

// פונקצית בדיקה של המשחק עם הכי מעט מהלכים

function record() {
  document.getElementById("recordButton").onclick = function () {
    if (countMoves1.playNum == 1) {
      alert(`There is no record yet`);
    } else {
      let arrBestScore = arrCountMoves2.map((v) => v.moves);
      bestScore = Math.min(...arrBestScore);
      let arrPlayRecord = arrCountMoves2.filter((v) => v.moves == bestScore);
      let numBestScore = arrPlayRecord.map((v) => v.playNum);
      numBestScore = numBestScore.toString().replaceAll(",", " and ");
      alert(`The record is ${bestScore} in game number ${numBestScore}`);
    }
  };
}

//-------------------------------------------
//פונקצייה לטיימר

function timerGame(){
  let timeIndex = 0
  timeNow = setInterval(myTimer,1000);

  function myTimer() {
    timeIndex = timeIndex+1;
    document.getElementById("timer").innerText = timeIndex;
  }
}

//-------------------------------------------
// פונקציה לשמירת משחק

function saveGame(){
  btnSaveGame.onclick = () =>{
    arrsaveGame = Game
    alert("The game is saved")
    console.log(arrsaveGame)
  }
}

//-------------------------------------------

function uploadGame(){
  btnUploadGame.onclick = () => {
    resetGame()
    for (i in Game) {
      for (let s = 0; s < Game[i].length; s++) {
        let elem = document.createElement("div");
        elem.className = "square";
        board.appendChild(elem);
        elem.id = Game[i][s];
}  
    }
  }
}


//-------------------------------------------
function startGame() {
  timerGame()
  for (i in Game) {
    for (let s = 0; s < Game[i].length; s++) {
      let elem = document.createElement("div");
      elem.className = "square";
      board.appendChild(elem);
      elem.id = Game[i][s];

      elem.onclick = (e) => {
        let square = e.target;
        countMoves1.moves++;
        if (square.innerText == "") {
          arrMuve.push(square.id);

          square.innerText = playNaw.mark; //הכנסת הסימון למשבצת לפי השחקן שמשחק עכשיו

          findItemInArray(Game, square.id); //הכנסת סימון של השחקן למיקום הנכון במערך

          checkSlant1(); //בדיקות האם יש ניצחון
          checkSlant2();
          checkRow();
          checkColumn();
          changePleyer(); //תור מתחלף
          record();
          saveGame()
        }
      };
    }
  }
  buildButton();
}

startGame();

