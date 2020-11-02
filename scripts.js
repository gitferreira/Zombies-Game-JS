
const canvas = document.getElementById("canvas1")
const ctx = canvas.getContext("2d")
canvas.width = innerWidth
canvas.height = innerHeight

const keys = []

const player = {

	x: 0,
	y:0,
	width: 294.07142857,
	height: 249.125,
	frameX: 0,
	frameY: 2,
	speed: 10,
	moving: false, 

}

const playerSprite = new Image();
playerSprite.src = "/images/Player.png";
// const background = new Image();
// background.src = "/images/Brick_04.png";

//Load enemies images
const images = {};
images.enemies = new Image();
images.enemies.src = "/images/zombie_0.png";

const explosions = {};
explosions.explosions = new Image();
explosions.explosions.src = "/images/explosion.png"

const blood = {};
blood.blood = new Image();
blood.blood.src = "/images/blood2.png"



const numberOfEnemies = Math.random()*(100 - 80) + 80;
const enemies = [];


class Enemies {
	constructor(){
		this.width = 128;
		this.height = 128;
		this.frameX = 0;
		this.frameY = 0;
		this.x = canvas.width ;
		this.y = Math.random()* (canvas.height - this.height);
		this.speed = Math.random()* (5 - 0.5) + 0.5;
		this.hp = 1;
	}
	draw(){
		draw(images.enemies, this.width * this.frameX, this.height * this.frameY, 
			this.width, this.height, this.x, this.y, this.width, this.height);
		
		if (this.frameX < 11) this.frameX++
		else this.frameX = 4;
	}
	update(){
		if (this.x < canvas.width + this.width) this.x -= this.speed;
		
	}
}

function spawnEnemies(){
	 setInterval(()=> {

		for (i = 0; i < numberOfEnemies; i++){
			enemies.push(new Enemies());
		}
	},5000)
}

spawnEnemies()



function draw(img, sX, sY, sW, sH, dX, dY, dW, dH){
	ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}



function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
	ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}



class Bullet {
	constructor (x, y, width, height, frameX, frameY, velocity) {
		this.x = x 
		this.y = y 
		this.width = width
		this.height = height
		this.frameX = frameX
		this.frameY = frameY
		this.velocity = velocity
	}

	draw() {
		draw(explosions.explosions, this.width * this.frameX, this.height * this.frameY, 
			this.width, this.height, this.x, this.y, this.width, this.height);
		
		if (this.frameX < 6) this.frameX++
		else this.frameX = 6
	}
		
	update() {
		this.draw()
		this.x = this.x + this.velocity.x
		this.y = this.y + this.velocity.y
		
	}

	}

	class Particle {
		constructor (x, y, width, height, frameX, frameY) {
			this.x = x 
			this.y = y 
			this.width = width
			this.height = height
			this.frameX = frameX 
			this.frameY = frameY
			
		}
	
		draw() {
			draw(blood.blood, this.width * this.frameX, this.height * this.frameY, 
				this.width, this.height, this.x, this.y, this.width, this.height);
			
			if (this.frameX < 2) this.frameX++
			else this.frameX = 2;
		}
			
		update() {
			this.draw()
			this.x = this.x 
			this.y = this.y 
			
		}
	
		}

		class Dead {
			constructor (x, y, width, height, frameX, frameY) {
				this.x = x 
				this.y = y 
				this.width = width
				this.height = height
				this.frameX = frameX
				this.frameY = frameY
				
			}
		
			draw() {
				draw(images.enemies, this.width * this.frameX, this.height * this.frameY, 
					this.width, this.height, this.x, this.y, this.width, this.height);
				
				if (this.frameX < 35) this.frameX++
				else this.frameX = 35;
			}
				
			update() {
				this.draw()
				this.x = this.x 
				this.y = this.y 
				
			}
		
			}

	

	const bullets = []
	const particles = []
	const deads = []


window.addEventListener("keydown", function(e){
	keys[e.keyCode] = true;
	player.moving = true;
	
});

window.addEventListener("keyup", function(e){
	delete keys[e.keyCode];
	player.moving = false; 

});


function movePlayer(){
	//TOP
	if (keys[87] && player.y > 0){
		player.y -= player.speed;
		player.frameY = 0; 
		player.moving = true;
	}
	//LEFT
	if (keys[65] && player.x > 0){
		player.x -= player.speed;
		player.frameY = 6;
		player.moving = true;
	}
	//DOWN
	if (keys[83] && player.y < canvas.height - player.height){
		player.y += player.speed;
		player.frameY = 4;
		player.moving = true;
	}
	//RIGHT
	if (keys[68] && player.x < canvas.width - player.width){
		player.x += player.speed;
		player.frameY = 2;
		player.moving = true;
	}
	//TOP RIGHT
	if (keys[87] && keys[68] && player.y > 0 && player.x < canvas.width - player.width ){
		
		player.y += player.speed/3;
		player.x -= player.speed/3;
		player.frameY = 1; 
		player.moving = true;
	}
	//TOP LEFT
	if (keys[87] && keys[65] && player.y > 0 && player.x > 0 ){
		player.y += player.speed/3;
		player.x += player.speed/3;
		player.frameY = 7; 
		player.moving = true;

	}
	//DOWN RIGHT
	if (keys[83] && keys[68] && player.y < canvas.height - player.height && player.x < canvas.width - player.width ){
		player.y -= player.speed/3;
		player.x -= player.speed/3;
		player.frameY = 3; 
		player.moving = true;

	}
	//DOWN LEFT
	if (keys[83] && keys[65] && player.x > 0 && player.y < canvas.height - player.height){
		
		player.y -= player.speed/3;
		player.x += player.speed/3;
		player.frameY = 5; 
		player.moving = true;
	}
}

function handlePlayerFrame(){
	if (player.frameX < 13 && player.moving) player.frameX++
	else player.frameX = 1;
}



let fps, fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps){
	fpsInterval = 1000/fps;
	then = Date.now();
	startTime = then;
	animate();
}


function animate(){
	requestAnimationFrame(animate);
	now = Date.now();
	elapsed = now - then;
	if (elapsed > fpsInterval){
		then = now - (elapsed % fpsInterval);
		ctx.clearRect(0,0, canvas.width, canvas.height);
		particles.forEach(particle => {
			particle.update()
		})
		deads.forEach(dead => {
			dead.update()
		})
		for (i = 0; i < enemies.length; i++){
		
			enemies[i].draw();
			enemies[i].update();

			};
			

			
			enemies.forEach((enemy, index)=> {
				enemy.update()

				const dist = Math.hypot(player.x + 100 - enemy.x , player.y + 75  - enemy.y)
				if (dist  < 50){ 
					
					enemies.splice(index, 1)
					particles.push(new Particle(enemy.x -200, enemy.y -150, 500, 500, 0, 0))
					deads.push(new Dead(enemy.x, enemy.y, 128, 128, 29, 2)) 
					}
				

				bullets.forEach((bullet, bulletsIndex) => {
					const dist = Math.hypot(bullet.x - enemy.x - 140, bullet.y - enemy.y - 70)
					
					if (dist  < 60){   
						if (enemy.hp > 1){
							enemy.hp -= 1
							bullets.splice(bulletsIndex, 1)
														
								
											
						} else { 
						enemies.splice(index, 1)
						bullets.splice(bulletsIndex, 1)
						particles.push(new Particle(bullet.x - 200 , bullet.y - 200, 500, 500, 0, 0))
						deads.push(new Dead(bullet.x, bullet.y, 128, 128, 29, 2)) }
					}
				})
			})

		
			
		bullets.forEach((bullet, index) => {
			bullet.update()

			if (bullet.x + bullet.width < 0 || 
				bullet.x - bullet.width > canvas.width ||
				bullet.y + bullet.width < 0 ||
				bullet.y - bullet.width > canvas.height) {
					bullets.splice(index, 1)
				}
			})
			
			

			drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY,
				player.width, player.height, player.x, player.y, player.width, player.height);
			   
			movePlayer()
		   handlePlayerFrame()
			
	}
}


addEventListener("click", (event)=> {

	
	const angle = Math.atan2(event.clientY - (player.y + player.height/2) , event.clientX - (player.x + player.width/2));
	

	const velocity = {
		x: Math.cos(angle)*50,
		y: Math.sin(angle)*50
	}
	bullets.push(new Bullet(player.x - 50 + player.width/2 , player.y - 50 + player.height/2 , 128, 140.5, 0, 0, velocity))
		
})

startAnimating(30);
