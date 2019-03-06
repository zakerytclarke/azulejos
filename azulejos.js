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


    this.players=[];
    for(var i=0;i<numPlayers;i++){
      this.players.push(new Player());
    }

    this.play=function(){
      this.setupFactories();

      outputBoard(this.players[this.turn],this.factoryboards,this.turn);

    }
    this.next=function(){
      //Check if round is over
      var bool=true;
      for(var i=0;i<this.factoryboards.length-1;i++){
        for(var j=0;j<this.factoryboards[i].length;j++){
          bool&=this.factoryboards[i][j]==0;
        }
      }
      if(bool){
        for(var i=0;i<this.players.length;i++){
          this.players[i].scoreBoard();
        }

        //Assign turn to whoever drew first
      }else{
        this.turn++;
        if(this.turn>=this.players.length){
          this.turn=0;
        }
      }


      this.turnState="draw";


      outputBoard(this.players[this.turn],this.factoryboards,this.turn);
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
    htmlboard[i][j].y=i;
    htmlboard[i][j].x=j;
    htmlboard[i][j].onclick=function(){
      if(game.turnState=="place"){

        //TODO CHECK CORRECT COLOR

        for(var k=0;k<this.y+1&&tileHolder.length!=0;k++){
          if(game.players[game.turn].board[this.y][4-k]==0){//Open Space and Same Color
            game.players[game.turn].board[this.y][4-k]=tileHolder.pop();
          }
        }
        //Penalize for extra tiles
        if(tileHolder.length!=0){

        }
        game.turnState="null";
        outputBoard(game.players[game.turn],game.factoryboards,game.turn);

        setTimeout(function(){game.next();},1000);
      }
    }
  }
}


//Assign Factory Click Function
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
            //Remove from Factory
            if(color==game.factoryboards[this.group][k]){//Move selected
              document.getElementById("factory"+this.group+":"+k).style.border="3px black dashed";
              game.factoryboards[this.group][k]=0;
              tileHolder.push(color);
            }else{//Move Discards
              var l=0;
              while(game.factoryboards[7][l]!=0){
                l++
              }
              game.factoryboards[7][l]=game.factoryboards[this.group][k];
              game.factoryboards[this.group][k]=0;
            }
          }
        }
      }
    }
  }
}







function outputBoard(player,factoryboards,turn){
  document.getElementById("score").innerHTML="Score: "+player.score;
  document.getElementById("turn").innerHTML="Player "+(turn+1);

  var board=player.board;
  for(var i=0;i<5;i++){
    for(var j=0;j<11;j++){
      htmlboard[i][j].style["background-color"]=colors[board[i][j]];
    }
  }
  for(var i=0;i<factoryboards.length;i++){
    for(var j=0;j<factoryboards[i].length;j++){
      document.getElementById("factory"+i+":"+j).style["background-color"]=colors[factoryboards[i][j]];
      document.getElementById("factory"+i+":"+j).style.border="3px black solid";
    }
  }
}
