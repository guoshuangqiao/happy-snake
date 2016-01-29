window.onload=function(){
	var 
	snake=[{x:0,y:0},{x:0,y:1},{x:0,y:2}],
	MAXSNAKE=100,RIGHT=39,LEFT=37,DOWN=40,UP=38,
	SNAKECOLOR='url(./img/1.jpg) 80%',FOODCOLOR='url(./img/apple.png) 50% 50%',DEFAULTCOLOR='WHITE',
	ROW=10,
	defaultDirection=RIGHT,

	isInSnake=function(x,y){
		for(var i=0; i<snake.length;i++){
			if(  snake[i].x == x && snake[i].y == y){
				return true;
			}
		}
		return false;
	},
	random=function(){
		return Math.floor(Math.random()*ROW);
	},
	dropFood=function(){
		var 
		x=random(), y=random();
		//警告:当蛇的数据占满整个页面时就会陷入死循环;
		if(snake.length==MAXSNAKE){
			alert('YOU WIN');
			return null;
		}
		while(isInSnake(x,y)){
			x=random();
			y=random();
		}
		document.getElementById(x+'_'+y).style.background=FOODCOLOR;
		return{x:x,y:y};
	},
	food=dropFood(),
	zou=function(dir){
		var last=snake.length-1,newHead,weiba;
		defaultDirection=dir;
		if(dir==RIGHT){newHead={x:snake[last].x,y:snake[last].y+1};}
		if(dir==LEFT ){newHead={x:snake[last].x,y:snake[last].y-1};}
		if(dir==DOWN ){newHead={x:snake[last].x+1,y:snake[last].y};}
		if(dir==UP   ){newHead={x:snake[last].x-1,y:snake[last].y};}
		if(newHead.x>9 || newHead.x<0 || newHead.y>9 || newHead.y<0){
			alert('GAME OVER!');
			location.reload();
			return null;
		}
		if(isInSnake(newHead.x,newHead.y)){
			alert('GAME OVER!');
			location.reload('index.html');
			return null;
		}
		snake.push(newHead);
		if(newHead.x==food.x && newHead.y==food.y){
			document.getElementById(food.x+'_'+food.y).style.background=SNAKECOLOR;
			food=dropFood();
			return null;
		}
		weiba=snake.shift();
		document.getElementById(weiba.x+'_'+weiba.y).style.background=DEFAULTCOLOR;
		document.getElementById(newHead.x+'_'+newHead.y).style.background=SNAKECOLOR;
		return null;
	};

	(function(){
   	 for ( var i = 0;  i < snake.length;  i++){
      	document.getElementById(snake[i].x +'_'+snake[i].y).style.background = SNAKECOLOR;
   	 }
   	 })();
	document.onkeydown=function(e){
		var direction=e.keyCode;
		if(direction==LEFT || direction==UP ||direction==RIGHT ||direction==DOWN ){
			if(Math.abs(direction-defaultDirection)!==2){
				zou(direction);
			}
		}
	};


};