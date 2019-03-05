var colors=["#E1E3D6","#3E6D97","#E8AF44","#D42E38","#201B17","#A9EAF0"];
//Blank=0;Blue=1;Orange=2;Red=3;Black=4;Teal=5

var htmlboard=[];

for(var i=0;i<5;i++){
  htmlboard[i]=[];
  for(var j=0;j<11;j++){
    htmlboard[i].push(document.getElementById("board"+j+":"+i));
  }
}


board=[
  [0,0,0,0,0,0,1,2,3,4,5],
  [0,0,0,0,0,0,5,1,2,3,4],
  [0,0,0,0,0,0,4,5,1,2,3],
  [0,0,0,0,0,0,3,4,5,1,2],
  [0,0,0,0,0,0,2,3,4,5,1],


];


var factoryboards=[
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];



for(var i=0;i<factoryboards.length;i++){
  for(var j=0;j<factoryboards[i].length;j++){
    factoryboards[i][j]=Math.round(Math.random()*5);
  }
}


console.log(board);
console.log(htmlboard);
outputBoard(board);




function outputBoard(board){
  for(var i=0;i<5;i++){
    for(var j=0;j<11;j++){
      console.log(i+":"+j);
      htmlboard[i][j].style["background-color"]=colors[board[i][j]];
    }
  }
  for(var i=0;i<factoryboards.length;i++){
    for(var j=0;j<factoryboards[i].length;j++){
      document.getElementById("factory"+i+":"+j).style["background-color"]=colors[factoryboards[i][j]];
    }
  }
}
