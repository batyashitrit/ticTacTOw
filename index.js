

let Game = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
];
let counter = 0;
let board = document.getElementById("board");
let btnLastMove = document.getElementById("btnLastMove");
let btnUploadGame = document.getElementById("btnUploadGame");
let players = [
  { player: "player1", mark: "X" },
  { player: "player2", mark: "O" },
];

let playNaw = players[0];

let countMoves1 = { playNum: 1, moves: 0 }; // מונה שסופר מהלכים במשחק
let arrCountMoves2 = []; // מערך שאליו יכנסו שיאי המשחקים
let timeNow;

let arrMuve = []; //מערך זיכרון למהלכים במשחק
let squareMuve = []; //מערך זיכרון למהלך לפי משבצות

let arrSaveGame = [] // מערך שיקבל את המשחק השמור
let arrSaveMuve = []
let arrSaveSquareMuve = []

let counterX = 0;
let counterO = 0;


//-------------------------------------------
//   :פונקציית החלפת שחקן V
function changePleyer() {
  if (playNaw == players[0]) {
    playNaw = players[1];
  } else {
    playNaw = players[0];
  }
}
//-------------------------------------------

//פונקציית בדיקת שורות V
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

//פונקציית בדיקת עמודות V
function checkColumn() {
  for (i in Game) {
    counterX = 0;
    counterO = 0;
    counter = 0;

    for (let c = 0; c < Game.length - 1; c++) {
      if (Game[c][i] == Game[c + 1][i] && Game[c][i] == "X") {
        counterX++;
        console.log(counterX + "Column "+ Game[c][i] );
      }else if (Game[c][i] == Game[c + 1][i] && Game[c][i] == "O"){
        counterO++
        console.log(counterO + "Column "+ Game[c][i] );
      }

      if(counterX == 2 || counterO == 2){
        counter = 2
        winner();
      }
    }
  }
}

//-------------------------------------------
//1בדיקת אלכסון V
function checkSlant1() {
  for (let i = 0; i < Game.length - 1; i++) {
    if (Game[i][i] == Game[i + 1][i + 1]) {
      counter++;
      console.log(counter + "Slant1");
      winner();
    }
  }
}

//-------------------------------------------
//2בדיקת אלכסון V
function checkSlant2() {
  counter = 0;
  for (let i = 0; i < Game.length - 1; i++) {
    if (Game[Game.length - 1 - i][i] == Game[Game.length - 2 - i][i + 1]) {
      counter++;
      // console.log(counter + "  Slant2  ");
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
// פונקציית ניצחון V
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

// פונקציית התחלת המשחק מחדש V
// כרגע כאשר לוחצים על הפונקציה והמשחק לא נגמר יש שגיאה בקונסול כי הוא לא מוצא איזה הודעה למחוק. כמו כן המשחק לא נספר בתור משחק אם לא הגיעו לניצחון
function resetGame() {
  timerGame()
  arrMuve = []; 
  squareMuve = []; 

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
  if(messagaDel){
  messagaDel.parentNode.removeChild(messagaDel);}
}

//-------------------------------------------

// פונקציית כפתור שמוחק מהלך V

btnLastMove.onclick = (e) =>{
  let outIndex = arrMuve[arrMuve.length-1][2]    //מיקום מערך חיצוני- ציר איקס
  let inIndex = arrMuve[arrMuve.length-1][4]     //מיקום מערך פנימי- ציר וואי
  let numSquare = arrMuve[arrMuve.length-1][0]   //הערך

  Game[outIndex][inIndex] = numSquare;    //החזרת הערך המספרי לתוך המיקום הנכון במערך
  arrMuve.pop();
  
  squareMuve[squareMuve.length-1].innerText = "";  //מחיקת טקסט מהמשבצת האחרונה 
  squareMuve.pop();
  

  console.log(squareMuve);  //מערך המשבצות (האלמנטים) לאחר המחיקה
  console.log(arrMuve);     //מערך המהלכים לאחר מחיקה
  console.log(Game);        //מערך המשחק לאחר מחיקה והחזרה של המצב לקדמותו


}

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

// פונקצית בדיקה של המשחק עם הכי מעט מהלכים V

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
//פונקצייה לטיימר V

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

//צריך לשמור פה את כל נתוני המשחק, כרגע זה רק הנתונים של שמירת המהלכים
function saveGame(){
  btnSaveGame.onclick = () =>{
    arrSaveGame = Game;
    arrSaveMuve = arrMuve;
    arrSaveSquareMuve = squareMuve;

    console.log(arrSaveGame,arrSaveMuve,arrSaveSquareMuve)
    alert("The game is saved")
  }
}

//-------------------------------------------
// השמה של משחק שמור

// צריך לתאם את כל הנתונים של המשחק השמור, ואז גם לתאם פיזית למשבצות

  btnUploadGame.onclick = () => {

    Game = arrSaveGame;                    //השמה של מפת המשחק השמור- המערך הראשי
    arrMuve = arrSaveMuve;                 //השמה של מערך המהלכים
    squareMuve = arrSaveSquareMuve;        //השמה של מערך המשבצות שסומנו במשחק השמור. איך נחזיר להן פיזית את הסימון?


   
//     resetGame()
//     for (i in Game) {
//       for (let s = 0; s < Game[i].length; s++) {
//         let elem = document.createElement("div");
//         elem.className = "square";
//         board.appendChild(elem);
//         elem.id = Game[i][s];
// }  
//     }
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
      elem.dataset.index = [Game[i][s],[i ,s]];        //הצפנת מידע עבור מערך המהלכים

      elem.onclick = (e) => {
        let square = e.target;
        countMoves1.moves++;
        if (square.innerText == "") {

          arrMuve.push(elem.dataset.index);          //הכנסת המידע של המהלך למערך מהלכים
          squareMuve.push(square);                   //הכנסת האלמנט עצמו למערך הפיזי של המהלכים

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