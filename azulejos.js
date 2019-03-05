var colors=["#E1E3D6","#3E6D97","#E8AF44","#D42E38","#3e4a51","#A9EAF0"];
//Blank=0;Blue=1;Orange=2;Red=3;Black=4;Teal=5




function Player(){
  this.score=0;

  this.board=[
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
  ];
}


function Game(numPlayers){
    this.turn=0;
    this.turnState="draw";

    this.next=function(){
      this.turnState="draw";
      this.turn++;
      if(this.turn>players.length){
        turn=0;
      }
    }

    this.factoryboards=[
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ];


    var bag=new Bag();//draw bag
    bag.shuffle();

    console.log(bag.bag);

    function Bag(){
      this.bag=[];
      for(var i=1;i<6;i++){
        for(var j=0;j<20;j++){
          this.bag.push(i);
        }
      }


      this.shuffle=function(){
        this.bag=shuffle(this.bag);
      }

      this.draw=function(){
        return this.bag.pop();
      }
      function shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
          j = Math.floor(Math.random() * (i + 1));
          x = a[i];
          a[i] = a[j];
          a[j] = x;
        }
        return a;
      }
    }

    this.discard=[];


    var players=[];
    for(var i=0;i<numPlayers;i++){
      players.push(new Player());
    }

    this.play=function(){
      this.setupFactories();

      outputBoard(players[this.turn].board,this.factoryboards);

    }
    this.setupFactories=function(){
      for(var i=0;i<7;i++){
        for(var j=0;j<4;j++){
          this.factoryboards[i][j]=bag.draw();
        }
      }
    }




}


var tileHolder=[];

//Configure Outputs
var htmlboard=[];


for(var i=0;i<5;i++){
  htmlboard[i]=[];
  for(var j=0;j<11;j++){
    htmlboard[i].push(document.getElementById("board"+j+":"+i));
  }
}




//Play Game
var game=new Game(2);
game.play();



//Configure Tile Clicking
for(var i=0;i<5;i++){
  for(var j=0;j<11;j++){
    htmlboard[i][j].x=i;
    htmlboard[i][j].x=j;
    htmlboard[i][j].onclick=function(){
      if(game.turnState=="place"){
        game.turnState="draw";
        game.next();

      }
    }
  }
}

for(var i=0;i<game.factoryboards.length;i++){
  for(var j=0;j<game.factoryboards[i].length;j++){
    document.getElementById("factory"+i+":"+j).group=i;
    document.getElementById("factory"+i+":"+j).space=j;
    document.getElementById("factory"+i+":"+j).onclick=function(){
      if(game.turnState=="draw"){
        var color=game.factoryboards[this.group][this.space];
        if(color!=0){
          this.style.border="3px black dashed";
          game.turnState="place";
          for(var k=0;k<game.factoryboards[this.group].length;k++){
            if(color==game.factoryboards[this.group][k]){
              document.getElementById("factory"+this.group+":"+k).style.border="3px black dashed";
              game.factoryboards[this.group][k]=0;
              tileHolder.push(color);
            }
          }
        }
      }
    }
  }
}







function outputBoard(board,factoryboards){
  for(var i=0;i<5;i++){
    for(var j=0;j<11;j++){
      htmlboard[i][j].style["background-color"]=colors[board[i][j]];
    }
  }
  for(var i=0;i<factoryboards.length;i++){
    for(var j=0;j<factoryboards[i].length;j++){
      document.getElementById("factory"+i+":"+j).style["background-color"]=colors[factoryboards[i][j]];
    }
  }
}
