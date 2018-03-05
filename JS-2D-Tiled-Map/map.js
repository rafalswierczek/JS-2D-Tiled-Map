'use strict';

texture[2].onload = function(){ // very questionable // [2]: number_of_textures-1

let moveX = 440, moveY = 440, // important for now: moveX|Y % 40 == 0 // min move: 400
speed = 2, // supported: 1, 2, 4, 8
mapTileSize = 40, // Const. Do not change this yet.
c_bg = document.createElement("canvas"),
c_p = document.createElement("canvas"),
ctx_bg = c_bg.getContext("2d"),
ctx_p = c_p.getContext("2d");
document.body.appendChild(c_bg);
document.body.appendChild(c_p);


c_p.width = c_bg.width = 680; // c_p.width % mapTileSize == 0 // Const. Do not change this yet.
c_p.height = c_bg.height = 680; // c_p.height % mapTileSize == 0 // Const. Do not change this yet.

let keys = [];
let poz_start = [moveX, moveY];

window.onkeydown = function(e)
{
	keys[e.keyCode] = true;
};
window.onkeyup = function(e)
{
	keys[e.keyCode] = false;
};

ctx_p.drawImage(texture[2], c_p.width/2-(3*mapTileSize/4), c_p.height/2-(3*mapTileSize/4), 3*mapTileSize/2, 3*mapTileSize/2); // green square width|height == 1.5*mapTileSize (collision is still 40x40)

function mapRender()
{
	let canvasX = Math.floor( (moveX - (c_bg.width/2 - mapTileSize/2)) / mapTileSize );
	let canvasY = Math.floor( (moveY - (c_bg.height/2 - mapTileSize/2)) / mapTileSize );
	let distanceX = moveX - poz_start[0];
	let distanceY = moveY - poz_start[1];

	// 2x if below is optional but very recommended
	if(distanceX >= mapTileSize || distanceX < 0)
	{
		distanceX += (-mapTileSize * Math.floor(distanceX/mapTileSize)); // translation distanceX to the left by 40 or 80 or 120...
	}

	if(distanceY >= mapTileSize || distanceY < 0)
	{
		distanceY += (-mapTileSize * Math.floor(distanceY/mapTileSize));
	}

	ctx_bg.clearRect(0, 0, c_bg.width, c_bg.height);
	for(let x = -2; x < 19; x++)
	{
		for(let y = -2; y < 19; y++)
		{
			ctx_bg.drawImage(
				eval(window["c"+(x+canvasX+1)+"x"+(y+canvasY+1)].bg),
				x * mapTileSize - distanceX, 
				y * mapTileSize - distanceY, 
				mapTileSize, 
				mapTileSize
			);
		}
	}

}mapRender();


function collision()
{
	let canvasX = Math.floor( (moveX - (c_bg.width/2 - mapTileSize/2)) / mapTileSize );
	let canvasY = Math.floor( (moveY - (c_bg.height/2 - mapTileSize/2)) / mapTileSize );
	let re = false;

	label: // :D
	for(let x = 7; x <= 9; x++) // very questionable but working great
	{
		for(let y = 7; y <= 9; y++)
		{
			if( eval(window["c"+(x+canvasX+1)+"x"+(y+canvasY+1)].collision) &&
				moveX < 40*(x+canvasX+1) && 
				moveX+40 > 40*(x+canvasX+1)-40 &&
				moveY < 40*(y+canvasY+1) &&
				(moveY+40) > 40*(y+canvasY+1)-40
				)
			{
				re = true;
				ctx_p.drawImage(texture[1], c_p.width/2-(3*mapTileSize/4), c_p.height/2-(3*mapTileSize/4), 3*mapTileSize/2, 3*mapTileSize/2);
				break label;
			}
			else
			{
				re = false;
				ctx_p.drawImage(texture[2], c_p.width/2-(3*mapTileSize/4), c_p.height/2-(3*mapTileSize/4), 3*mapTileSize/2, 3*mapTileSize/2);
			}
		}
	}
	return re;
}


function animate()
{ // W: 87, A: 65, S: 83, D: 68

	if(keys[87]){ moveY-=speed; if(collision()) moveY+=speed;}
	if(keys[65]){ moveX-=speed; if(collision()) moveX+=speed;}
	if(keys[83]){ moveY+=speed; if(collision()) moveY-=speed;}
	if(keys[68]){ moveX+=speed; if(collision()) moveX-=speed;}

	mapRender();

	requestAnimationFrame(animate);
}
setTimeout(function(){requestAnimationFrame(animate);}, 1000);



}//onload