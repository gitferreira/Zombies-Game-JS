
const canvas = document.getElementById("canvas1")
const ctx = canvas.getContext("2d")

canvas.width = innerWidth
canvas.height = innerHeight

const scoreEl = document.querySelector("#scoreEl")
const ammoEl = document.querySelector("#ammoEl")
const bigScoreEl = document.querySelector("#bigScoreEl");
const startGameBtn = document.querySelector("#startGameBtn");
const modalEl = document.querySelector("#modalEl");
const bgm = document.getElementById("bgm")
bgm.volume = 0.2
const fireball = document.getElementById("fireball")
fireball.volume = 0.2
const zombieSound = document.getElementById("zombieSound")
zombieSound.volume = 0.1
const splash = document.getElementById("splash")
splash.volume = 0.05
const keys = []

const player = {

	x: 0,
	y:300,
	width: 294.07142857,
	height: 249.125,
	frameX: 0,
	frameY: 2,
	speed: 10,
	moving: false, 

}

const playerBg = {

	x: 0,
	y:0,
	width: 1280,
	height: 720,
	frameX: 0,
	frameY: 0,
	

}

const playerSprite = new Image();
playerSprite.src = "./images/Player.png";

const background = new Image();
background.src = "./images/unknown1.png";

const playerBackground = new Image();
playerBackground.src = "./images/fondo3.png";

//Load enemies images
const images = {};
images.enemies = new Image();
images.enemies.src = "./images/zombie_0.png";

const explosions = {};
explosions.explosions = new Image();
explosions.explosions.src = "./images/explosion.png"

const blood = {};
blood.blood = new Image();
blood.blood.src = "./images/blood2.png"

const civilians = {}
civilians.civilians = new Image();
civilians.civilians.src = "./images/mujer2.png"


const numberOfCivilians= Math.random()*(2 - 1) + 1;


class Civilians {
	constructor(){
		this.width = 36;
		this.height = 69;
		this.frameX = 0;
		this.frameY = 4;
		this.x = Math.random() * (300 - 150) + 150;
		this.y = canvas.height;
		this.speed = Math.random()* (3 - 0.5) + 0.5;
		
	}
	draw(){
		draw(civilians.civilians, this.width * this.frameX, this.height * this.frameY, 
			this.width, this.height, this.x, this.y, this.width, this.height);
		
		if (this.frameX < 8) this.frameX++
		else this.frameX = 1;
	}
	update(){
		if (this.y > 0 + this.height) this.y -= this.speed;
		
	}
}
const numberOfEnemies = Math.random()*(10 - 8) + 8;


class Enemies {
	constructor(){
		this.width = 128;
		this.height = 128;
		this.frameX = 0;
		this.frameY = 0;
		this.x = canvas.width;
		this.y = Math.random()* (700 - 300) + 300 ;
		this.speed = Math.random()* (4 - 0.5) + 1;
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


function spawnCivilians(){
	setInterval(()=> {

	   for (i = 0; i < numberOfCivilians; i++){
		   civiliansArray.push(new Civilians());
	   }
   },5000)
}





function draw(img, sX, sY, sW, sH, dX, dY, dW, dH){
	ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function drawBackground(img, sX, sY, sW, sH, dX, dY, dW, dH){
	ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
	ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function drawBackground(img, sX, sY, sW, sH, dX, dY, dW, dH){
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
		
		if (this.frameX < 8) this.frameX++
		
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

			class DeadCivilian {
				constructor (x, y, width, height, frameX, frameY) {
					this.x = x 
					this.y = y 
					this.width = width
					this.height = height
					this.frameX = frameX
					this.frameY = frameY
					
				}
			
				draw() {
					draw(civilians.civilians, this.width * this.frameX, this.height * this.frameY, 
						this.width, this.height, this.x, this.y, this.width, this.height);
					
					if (this.frameX < 1) this.frameX++
					else this.frameX = 1;
				}
					
				update() {
					this.draw()
					this.x = this.x 
					this.y = this.y 
					
				}
			
				}	



	
	let civiliansArray = [];
	let bullets = []
	let particles = []
	let deads = []
	let deadCivilians = []
	let enemies = [];

	function init() { 

	 civiliansArray = [];
	 bullets = []
	 particles = []
	 deads = []
	 deadCivilians = []
	 enemies = [];

	}

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
let ammo = 0
let score = 0
let civiliansKilled = 0; 
let animationId

function animate(){
	animationId = requestAnimationFrame(animate);
	now = Date.now();
	elapsed = now - then;
	if (elapsed > fpsInterval){
		then = now - (elapsed % fpsInterval);
		ctx.clearRect(0,0, canvas.width, canvas.height);

	

		

		drawBackground(playerBackground, playerBg.width * playerBg.frameX, playerBg.height * playerBg.frameY,
			playerBg.width, playerBg.height, playerBg.x, playerBg.y, canvas.width, canvas.height);

			zombieSound.play()
			
			

				if(playerBg.frameX < 39)
				playerBg.frameX++;
				else playerBg.frameX = 0
			
			

		// ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
		particles.forEach(particle => {
			particle.update()
		})

		
		
		deads.forEach(dead => {
				dead.update()
		})

		deadCivilians.forEach(deadCivilian => {
			deadCivilian.update()
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
					particles.push(new Particle(enemy.x - 130, enemy.y - 70, 500, 500, 0, 0))
					deads.push(new Dead(enemy.x, enemy.y, 128, 128, 29, 2)) 
					score += 200
					scoreEl.innerHTML = score
					ammo++
					ammoEl.innerHTML = ammo
					let splashSound = true;
					if (splashSound) {
						splash.pause();
						splash.currentTime = 0;
						splash.play();
						splashSound = false;
					}
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
						particles.push(new Particle(bullet.x -100, bullet.y - 100, 500, 500, 0, 0))
						deads.push(new Dead(bullet.x, bullet.y, 128, 128, 29, 2)) 
						score += 100
						scoreEl.innerHTML = score}
					}
				})
 
				civiliansArray.forEach((civilian, civilianIndex) => {
					const dist = Math.hypot(civilian.x - enemy.x - 100, civilian.y - enemy.y )
					
					if (dist  < 60){   
						 civiliansArray.splice(civilianIndex, 1)
						//  deadCivilians.push(new DeadCivilian(civilian.x, civilian.y, 80, 80, 0, 4))
						 particles.push(new Particle(civilian.x -200, civilian.y -150, 500, 500, 0, 0))
						 console.log("dead")
						 civiliansKilled++
						 if (civiliansKilled > 10){
							cancelAnimationFrame(animationId)
							modalEl.style.display = "flex"
							bigScoreEl.innerHTML = score
							bgm.pause();
							bgm.currentTime = 0
						 }

						 }
				})
				

			})

		
			civiliansArray.forEach((civilian, civIndex) => {
				civilian.draw()
				civilian.update()
				 
				if (civilian.y < 300) {
					civiliansArray.splice(civIndex, 1)
					
				}
				
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

const soundFireball = true;

addEventListener("click", (event)=> {

	
	const angle = Math.atan2(event.clientY - (player.y + player.height/2) , event.clientX - (player.x + player.width/2));
	

	const velocity = {
		x: Math.cos(angle)*40,
		y: Math.sin(angle)*30
	}
	if (ammo >= 1) { 
		bullets.push(new Bullet(player.x + 50 + player.width/2 , player.y - 50 + player.height/2 , 128, 140.5, 1, 0, velocity))
		ammo--
		ammoEl.innerHTML = ammo
		if (soundFireball) {
			fireball.pause();
			fireball.currentTime = 0;
			fireball.play();
			soundFireball = false;
		}

	}else {
		console.log(ammo)
	}
	
		
})



startGameBtn.addEventListener("click", () => {
	
	modalEl.style.display = "none"
	startAnimating(30);
	spawnEnemies();
	spawnCivilians()
	init()
	score = 0
	scoreEl.innerHTML = score
	bigScoreEl.innerHTML = score
	ammo = 0
	ammoEl.innerHTML = ammo
	civiliansKilled = 0
	setTimeout(()=> { 
		bgm.play()
	}, 5000)
	

})