var colors=["#E1E3D6","#3E6D97","#E8AF44","#D42E38","#3e4a51","#A9EAF0"];
//Blank=0;Blue=1;Orange=2;Red=3;Black=4;Teal=5


  var pattern=[
    [0,0,0,0,0,0,1,2,3,4,5],
    [0,0,0,0,0,0,5,1,2,3,4],
    [0,0,0,0,0,0,4,5,1,2,3],
    [0,0,0,0,0,0,3,4,5,1,2],
    [0,0,0,0,0,0,2,3,4,5,1],
  ];
  
  
  

function Player(){
  this.score=0;

  this.board=[
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
  ];


  this.scoreBoard=function(){
    for(var i=0;i<5;i++){
      var bool=true;
      var color=0;
      for(var j=0;j<=i;j++){		
        bool=bool&&this.board[i][4-j]!=0;
      		color=this.board[i][4-j];
      }
      if(bool){
      	//Clear Row
      	for(var k=0;k<6;k++){
      		this.board[i][k]=0;	
      	}
      	for(var k=6;k<11;k++){
      	 		if(pattern[i][k]==color){
								
								//Check if color already used
								if(this.board[i][k]==0){
        				this.board[i][k]=color;	
        			
        			
        				this.score++;
        				//Score
        				l=i-1;
        				while(l>=0&&this.board[l][k]!=0){
        					this.score++;
        					l--;
        				}
        				l=i+1;
        				while(l<=4&&this.board[l][k]!=0){
        					this.score++;
        					l++;
        				}
        			
        				l=k-1;
        				while(l>=6&&this.board[i][l]!=0){
        					this.score++;
        					l--;
        				}
        				l=k+1;
        				while(l<=10&&this.board[i][l]!=0){
        					this.score++;
        					l++;
        				}
        			}
        		}
        }
        
      }
    }
  }
  this.scoreFinal=function(){
  		
  		
  		for(var i=0;i<this.board.length;i++){
  			//Score Columns
  			if(this.board[0][6+i]!=0&&
  					this.board[1][6+i]!=0&&
  					this.board[2][6+i]!=0&&
  					this.board[3][6+i]!=0&&
  					this.board[4][6+i]!=0)
  			{
  				this.score+=7;	  					
  			}
  			//Score Rows
  			if(this.board[i][6+0]!=0&&
  					this.board[i][6+1]!=0&&
  					this.board[i][6+2]!=0&&
  					this.board[i][6+3]!=0&&
  					this.board[i][6+4]!=0)
  			{
  				this.score+=2;	  					
  			}
  					
  		}
  		//Score Colors
  			//Blue
  			if(this.board[0][6+0]!=0&&
  					this.board[1][6+1]!=0&&
  					this.board[2][6+2]!=0&&
  					this.board[3][6+3]!=0&&
  					this.board[4][6+4]!=0)
  			{
  				this.score+=10;	  					
  			}
  			//Orange
  			if(this.board[0][6+1]!=0&&
  					this.board[1][6+2]!=0&&
  					this.board[2][6+3]!=0&&
  					this.board[3][6+4]!=0&&
  					this.board[4][6+0]!=0)
  			{
  				this.score+=10;	  					
  			}
  			//Red
  			if(this.board[0][6+2]!=0&&
  					this.board[1][6+3]!=0&&
  					this.board[2][6+4]!=0&&
  					this.board[3][6+0]!=0&&
  					this.board[4][6+1]!=0)
  			{
  				this.score+=10;	  					
  			}
  			//Black
  			if(this.board[0][6+3]!=0&&
  					this.board[1][6+4]!=0&&
  					this.board[2][6+0]!=0&&
  					this.board[3][6+1]!=0&&
  					this.board[4][6+2]!=0)
  			{
  				this.score+=10;	  					
  			}
  			//Teal
  			if(this.board[0][6+4]!=0&&
  					this.board[1][6+0]!=0&&
  					this.board[2][6+1]!=0&&
  					this.board[3][6+2]!=0&&
  					this.board[4][6+3]!=0)
  			{
  				this.score+=10;	  					
  			}
  }
	this.rowComplete=function(){
      for(var i=0;i<this.board.length;i++){
 	 				if(this.board[i][6+0]!=0&&
  					this.board[i][6+1]!=0&&
  					this.board[i][6+2]!=0&&
  					this.board[i][6+3]!=0&&
  					this.board[i][6+4]!=0)
  				{
  					return true;  					
  				}
 			}
 			return false; 					
  			
	
	
	}
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


    function Bag(){
      this.bag=[];
      for(var i=1;i<6;i++){
        for(var j=0;j<10*numPlayers;j++){
          this.bag.push(i);
        }
      }


      this.shuffle=function(){
        this.bag=shuffle(this.bag);
      }
					
				this.size=function(){
					return this.bag.length;
				}
      this.draw=function(){
        return this.bag.pop();
      }
      this.add=function(){
      	this.bag.push();
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
      for(var i=0;i<this.factoryboards.length;i++){
        for(var j=0;j<this.factoryboards[i].length;j++){
          bool=bool&&this.factoryboards[i][j]==0;
        }
      }
      //Check row filled
      var boolRow=false;
      for(var i=0;i<this.players.length;i++){
      	if(this.players[i].rowComplete()){
      		boolRow=true;
      	}
      }
      
      
      //Game Over?
      if((bag.size()<=0&&bool)||(boolRow&&bool)){
   
      //Score Columns and All color
      for(var i=0;i<this.players.length;i++){
          this.players[i].scoreFinal();
       }
      
      
      
      //Get Winner
      	for(var i=0;i<this.players.length;i++){
          this.players[i].scoreBoard();
        }
      	var highest=0;
      	var p=0;
      	for(var i=0;i<this.players.length;i++){
      		if(this.players[i].score>highest){
      			p=i;
      			highest=this.players[i].score;
      		}
      	}
      	
      	
      	//Final ScoreBoard  	
      	var tieBool=false;
      	for(var i=0;i<this.players.length;i++){
      		if(highest==this.players[i].score&&p!=i){
      			tieBool=true;
      		}
      	}
      	
      	if(tieBool){
      		document.getElementById("winner").innerHTML="Players Tied!";
      	}else{
      		document.getElementById("winner").innerHTML="Player "+(p+1)+" won!";
      	}
      	
      	document.getElementById("start").style.display="none";
      	document.getElementById("end").style.display="block";
     		document.getElementById("title-page").style.display="block";
      }else
      if(bool){
      
        for(var i=0;i<this.players.length;i++){
          this.players[i].scoreBoard();
        }
		
					
					
					this.setupFactories();

        //Assign turn to whoever drew first
        if(pNext!=-1){
        	game.turn=pNext;
        }
        pNext=-1;
      }
      //Check if Game Over
      else{
        this.turn++;
        if(this.turn>=this.players.length){
          this.turn=0;
        }
      }


      this.turnState="draw";


      outputBoard(this.players[this.turn],this.factoryboards,this.turn);
    }

    this.setupFactories=function(){
      for(var i=0;i<(3+this.players.length);i++){
        for(var j=0;j<4&&bag.size()>0;j++){
          this.factoryboards[i][j]=bag.draw();
        }
      }
    }




}


var tileHolder=[];
var pNext=-1;

//Configure Outputs
var htmlboard=[];


for(var i=0;i<5;i++){
  htmlboard[i]=[];
  for(var j=0;j<11;j++){
    htmlboard[i].push(document.getElementById("board"+j+":"+i));
  }
}



  //Initialize the backgrounds
  for(var i=0;i<pattern.length;i++){
  	for(var j=6;j<pattern[i].length;j++){
  		var cs=color[pattern[i][j]];
  		alert(cs.substring(1,4));
  		htmlboard[i][j].style.border="5px "+cs+" solid";
  
  	}
  
  }

//Play Game
var game=new Game(2);

function start(num){
game=new Game(num);
game.play();

document.getElementById("title-page").style.display="none";


}




//Configure Tile Clicking
for(var i=0;i<5;i++){
  for(var j=0;j<11;j++){
    htmlboard[i][j].y=i;
    htmlboard[i][j].x=j;
    htmlboard[i][j].onclick=function(){
      if(game.turnState=="place"){
				
        if(game.players[game.turn].board[this.y][4]==0||
        		 game.players[game.turn].board[this.y][4]==tileHolder[0]){
        		 	for(var k=0;k<this.y+1&&tileHolder.length!=0;k++){
         		 if(game.players[game.turn].board[this.y][4-k]==0){//Open Space and Same Color
           		 game.players[game.turn].board[this.y][4-k]=tileHolder.pop();
          		}
        			}
        	}
        //Penalize for extra tiles
        if(tileHolder.length!=0){
        		var punishment=[1,1,1,2,2,3,3,3];
        		while(tileHolder.length>0){
        			if(punishment.length>0){
        				game.players[game.turn].score-=punishment[0];
        				punishment.pop();
        			}else{
        				game.players[game.turn].score-=3;
        			}
        			tileHolder.pop();
        		}
          tileHolder=[];
        }
        game.turnState="null";
        outputBoard(game.players[game.turn],game.factoryboards,game.turn);

						//Refresh after a moment
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
          
          //Check if first to draw from Discard
          if(this.group==7&&pNext==-1){
          	game.players[game.turn].score-=1;
          	pNext=game.turn;
          }
          
          
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



function reset(){
	document.getElementById("end").style.display="none";
	
	document.getElementById("start").style.display="block";

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
