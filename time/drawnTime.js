var window_width = 1500;
var window_height = 700;
var RADIUS = 8;
var margin_top = 60;
var margin_left = 30;
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]
var balls = [];
var newTime = 0;

//判断浏览器是否是当前界面
var isInterface = true;
var hiddenProperty = 'hidden' in document ? 'hidden' :    
    'webkitHidden' in document ? 'webkitHidden' :    
    'mozHidden' in document ? 'mozHidden' :    
    null;
var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
var onVisibilityChange = function(){
       if (!document[hiddenProperty]) {    
            isInterface =  true;
       }else{
            isInterface =  false;
       }
    }

document.addEventListener(visibilityChangeEvent, onVisibilityChange);
window.onload= function(){
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');

	canvas.width = window_width;
	canvas.height = window_height;
	newTime = (new Date()).getTime();

	setInterval(
		function(){
			render(context);
			isInterfaceOK();
		},
		50
		);
}

//判断浏览器是否正在当前界面，防止小球过多
function isInterfaceOK(){
	if(isInterface){
		update();
		updateBalls();
	}
  }
function render(ctx){
	ctx.clearRect(0,0,window_width,window_height);
	var oDate = new Date(); //实例一个时间对象；
	oDate.getFullYear();   //获取系统的年；
	oDate.getMonth()+1;   //获取系统月份

	var hour = oDate.getHours(); //获取系统时，
	var minutes = 	oDate.getMinutes(); //分;
	var seconds = 	oDate.getSeconds(); //秒

	renderDight(margin_left,margin_top,parseInt(hour/10),ctx);
	renderDight(margin_left+15*(RADIUS+1),margin_top,parseInt(hour%10),ctx);
	renderDight(margin_left+30*(RADIUS+1),margin_top,10,ctx);

	renderDight(margin_left+39*(RADIUS+1),margin_top,parseInt(minutes/10),ctx);
	renderDight(margin_left+54*(RADIUS+1),margin_top,parseInt(minutes%10),ctx);
	renderDight(margin_left+69*(RADIUS+1),margin_top,10,ctx);

	renderDight(margin_left+78*(RADIUS+1),margin_top,parseInt(seconds/10),ctx);
	renderDight(margin_left+93*(RADIUS+1),margin_top,parseInt(seconds%10),ctx);

	 for( var i = 0 ; i < balls.length ; i ++ ){
        ctx.fillStyle=balls[i].color;

        ctx.beginPath();
        ctx.arc( balls[i].x , balls[i].y , RADIUS , 0 , 2*Math.PI , true );
        ctx.closePath();

        ctx.fill();
    }
}

function renderDight(x,y,num,ctx){
	ctx.fillStyle = "rgb(0,102,153)";
	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if(digit[num][i][j] == 1){
				ctx.beginPath();
				ctx.arc(x+j*2*(RADIUS+1)+(RADIUS+1), y+i*2*(RADIUS+1)+RADIUS+1, RADIUS, 0, 2*Math.PI);
				ctx.closePath();
				ctx.fill();
				ctx.stroke();
			}
		}
	}
}

function addBalls( x , y , num ){
	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) 
            if( digit[num][i][j] == 1 ){
                var aBall = {
                    x:x+j*2*(RADIUS+1)+(RADIUS+1),
                    y:y+i*2*(RADIUS+1)+(RADIUS+1),
                    g:1.5+Math.random(),
                    vx:Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4,
                    vy:-5,
                    color: colors[ Math.floor( Math.random()*colors.length ) ]
                }
                balls.push( aBall )
            }
        }
}
function update(){
	var nextShowTimeSeconds = (new Date()).getTime();
    if(nextShowTimeSeconds - newTime > 1000){
    	var newData = new Date(nextShowTimeSeconds); //实例一个时间对象；
		newData.getFullYear();   //获取系统的年；
		newData.getMonth()+1;   //获取系统月份

		var nextHours = newData.getHours(); //获取系统时，
		var nextMinutes = 	newData.getMinutes(); //分;
		var nextSeconds = 	newData.getSeconds(); //秒

		var curData = new Date(newTime); //实例一个时间对象；
		curData.getFullYear();   //获取系统的年；
		curData.getMonth()+1;   //获取系统月份

		var curHours = curData.getHours(); //获取系统时，
		var curMinutes = 	curData.getMinutes(); //分;
		var curSeconds = 	curData.getSeconds(); //秒
        if( parseInt(curHours/10) != parseInt(nextHours/10) ){
            addBalls( margin_left + 0 , margin_top , parseInt(curHours/10));
        }
        if( parseInt(curHours%10) != parseInt(nextHours%10) ){
            addBalls( margin_left + 15*(RADIUS+1) , margin_top , parseInt(curHours/10));
        }

        if( parseInt(curMinutes/10) != parseInt(nextMinutes/10) ){
            addBalls( margin_left + 39*(RADIUS+1) , margin_top , parseInt(curMinutes/10));
        }
        if( parseInt(curMinutes%10) != parseInt(nextMinutes%10) ){
            addBalls( margin_left + 54*(RADIUS+1) , margin_top , parseInt(curMinutes%10));
        }

        if( parseInt(curSeconds/10) != parseInt(nextSeconds/10) ){
            addBalls( margin_left + 78*(RADIUS+1) , margin_top , parseInt(curSeconds/10));
        }
        if( parseInt(curSeconds%10) != parseInt(nextSeconds%10) ){
            addBalls( margin_left + 93*(RADIUS+1) , margin_top , parseInt(nextSeconds%10));
        }
        newTime = nextShowTimeSeconds;
    }
}



function updateBalls(){
    for( var i = 0 ; i < balls.length ; i ++ ){
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if( balls[i].y >= window_height-RADIUS ){
            balls[i].y = window_height-RADIUS;
            balls[i].vy = - balls[i].vy*0.75;
        }
    }

    var num = 0;
    for( var i = 0 ; i < balls.length ; i ++ ){
    	if(balls[i].x +RADIUS > 0 && balls[i].x - RADIUS < window_width){
    		balls[num] = balls[i];
    		num++;
    	}
    }
   while(balls.length > num)
    	balls.pop();
}