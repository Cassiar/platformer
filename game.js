var GRAVITY = 0.3;
var JUMP = -5;
var groundSprites;
var GROUND_SPRITE_WIDTH = 50;
var GROUND_SPRITE_HEIGHT = 50;
var numGroundSprites;
var player;
var obstacleSprites;
var isGameOver;
var score = 0;
var jewel;
var jewelImage;

function preload() {
	// jewelImage = loadImage("");
}

function setup() {
	isGameOver = false;
	var score = 0;

	jewel = createSprite(camera.position.x + width, random(0, (height-12.5)-15), 12.5, 12.5);
	// jewelImage.addImage(jewelImage);
	jewel.rotation = 45;

	createCanvas(800, 600);
	background(150, 200, 250);
	groundSprites = new Group();

	numGroundSprites = width/GROUND_SPRITE_WIDTH + 1;

	for (var n = 0; n < numGroundSprites; n++) {
		var groundSprite = createSprite(n*50, height-25, GROUND_SPRITE_WIDTH, GROUND_SPRITE_HEIGHT);
		groundSprites.add(groundSprite);
	}

	player = createSprite(100, 300, 30, 30);
	obstacleSprites = new Group();
	// jewelSprites = new Group();
}

function draw() {

	if (isGameOver) {
		background(0);
		fill(255);
		textAlign(CENTER);
		text("Your score was: " + score, camera.position.x, camera.position.y - 20);
		text("Game Over! Click anywhere to restart", camera.position.x, camera.position.y);
	} else {
	background(150, 200, 250);
	player.velocity.y = player.velocity.y + GRAVITY;

	if (groundSprites.overlap(player)) {
		player.velocity.y = 0;
		player.position.y = 40;
	}

	if (player.position.y < -5) {
		player.position.y = height-100;
	}
	if (keyDown(UP_ARROW)) {
		player.velocity.y = JUMP;
	}
	if (keyDown(DOWN_ARROW)) {
		player.velocity.y = GRAVITY*40;
	}

	player.position.x = player.position.x + 5;
	camera.position.x = player.position.x + (width/4);
	var firstGroundSprite = groundSprites[0];

	if (firstGroundSprite.position.x <= camera.position.x - (width/2 + firstGroundSprite.width/2)) {
		groundSprites.remove(firstGroundSprite);
		firstGroundSprite.position.x = firstGroundSprite.position.x + numGroundSprites*firstGroundSprite.width;
		groundSprites.add(firstGroundSprite);
	}

	if (random() > .94){
		var obstacle = createSprite(camera.position.x + width, random(0, (height-25)-15), 25, 25);
		obstacleSprites.add(obstacle);
	}

var firstObstacle = obstacleSprites[0];
	if (obstacleSprites.length > 0 && firstObstacle.position.x <= camera.position.x - (width/2 + firstObstacle.width/2)) {
		removeSprite(firstObstacle);
	}
	obstacleSprites.overlap(player, endGame);

	if (jewel.position.x <= camera.position.x - (width/2 + jewel.width/2)) {
		jewel.position.x = camera.position.x + width;
		jewel.position.y = random(0, (height-10)-15);
	}
	jewel.overlap(player, addScore);
	drawSprites();
	score = score + 1;
	textAlign(CENTER);
	text(score, camera.position.x, 10);
    }
}

function addScore() {
	score = score + 50;
	jewel.position.x = camera.position.x + width;
	jewel.position.y = random(0, (height-10)-15);
}

function endGame() {
	isGameOver = true;
}

function mouseClicked() {
	if (isGameOver) {

		for (var n = 0; n < numGroundSprites; n++) {
  			var groundSprite = groundSprites[n];
 			groundSprite.position.x = n*50;
		}

		player.position.x = 100;
		player.position.y = height-75;

		obstacleSprites.removeSprites();

		jewel.position.x = camera.position.x + width;
		jewel.position.y = random(0, (height-10)-15);

		score = 0;
		isGameOver = false;
	}
}