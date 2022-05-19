
let Game=[['X','X','O'],['X','O','X'],['O','X','X']];
let counter=0;
// for(n of Game){
// n[1]='O';
// counterO++;;
// }
// console.log(counterO)
// debugger
for(c in Game){      //בדיקת שורות
    counter=0
    for (let i = 0; i < Game.length-1; i++) {
        if (Game[c][i] == Game[c][i+1]){
           counter++
           console.log(counter);
       }
    
    }
}
counter=0;

for(i in Game){      //בדיקת עמודות
    counter=0
    for (let c = 0; c < Game.length-1; c++) {
        if (Game[c][i] == Game[c+1][i]){
           counter++
           console.log(counter);
       }
    
    }
}

      //1בדיקת אלכסון
    counter=0
    let d=0
    for (let i = 0; i < Game.length-1; i++) {
        if (Game[d][i] == Game[d+1][i+1]){
           counter++
           console.log(counter);
       }
    
    }

//2בדיקת אלכסון
counter=0
let e=0
for (let i = Game.length-1; i >0; i--) {
    if (Game[e][i] == Game[e+1][i-1]){
       counter++
       console.log(counter);
   }

}