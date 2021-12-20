//create variables
var bg, backgroundImg;
var stoneGroup, stoneImage;
var diamondsGroup, diamondImage;
var diamondScore=0;
var spikeGroup, spikeImage;

function preload() {
  //loading Images
  backgroundImg = loadImage("images/bg.jpg");
  ironManImage = loadImage("images/iron.png");
  stoneImage = loadImage("images/stone.png");
  diamondImage = loadImage("images/diamond.png");
  spikeImage = loadImage("images/spikes.png");
}

function setup() {
  createCanvas(1000, 900);

  //create background sprite
  bg = createSprite(580,500);
  bg.addImage(backgroundImg);
  bg.scale =2;

  //create mario sprite
  ironMan = createSprite(200,505,20,50);
  ironMan.addImage(ironManImage);
  ironMan.scale=0.3;
  ironMan.debug=true;
  ironMan.setCollider("rectangle",100,0,200,400)
  
  //create groups
  stoneGroup = new Group();
  diamondsGroup = new Group();
  spikeGroup = new Group();

}

function draw() {
  //giving keys for ironman to move
  if (keyDown("up")) {
    ironMan.velocityY = -10;
  }
  if (keyDown("left")) {
    ironMan.x = ironMan.x - 5;
  }
  if (keyDown("right")) {
    ironMan.x = ironMan.x + 5;
}
 //call the function to generate stones
generateStone();

//gravity
ironMan.velocityY = ironMan.velocityY + 0.5;

//make ironman collide on stones
for(var i = 0 ; i< (stoneGroup).length ;i++){
  var temp = (stoneGroup).get(i) ;
  
  if (temp.isTouching(ironMan)) {
     ironMan.collide(temp);
    }     
  }

  //giving limitation to ironman
  if(ironMan.x<20){
    ironMan.x=20;
  }

  if(ironMan.y<100){
    ironMan.y=100;
  }

  //call the function to generate diamonds
  generateDiamonds();

  //make ironman collect diamonds
  for (var i = 0; i < diamondsGroup.length; i++) {
    var temp = diamondsGroup.get(i);

    if (temp.isTouching(ironMan)) {
      //increase score when diamond is collected
      diamondScore++;
      //destroy diamond once collected
      temp.destroy();
      temp = null;
    }
  }

  //call the function to generate spikes
  generateSpike();

  //if ironman collect spike than score reduces
  for (var i = 0; i < spikeGroup.length; i++) {
    var temp = spikeGroup.get(i);

    if (temp.isTouching(ironMan)) {
      diamondScore=-5;
      temp.destroy();
      temp = null;
      
    }
  }
  //making diamond score count
  textSize(25);
  fill("yellow")
  text("Diamond Colleted: "+  diamondScore +  400,50);
  
//make function to generate stones
function generateStone() {
  if (frameCount % 100 === 0) {
    var stone = createSprite(1200,120,40,10);
    stone.x = random(-30,760);
    stone.addImage(stoneImage);
    stone.scale = 1;
    stone.velocityY = 5;
    stone.lifetime =250;
    stoneGroup.add(stone);
  }
}

//make function to generate diamonds
function generateDiamonds() {
  if (frameCount % 100 === 0) {
    var diamond = createSprite(1200,120,40,10);
    diamond.x = random(-40,750);
    diamond.addImage(diamondImage);
    diamond.scale = 0.5;
    diamond.velocityY = 10;
    diamond.lifetime =1200;
    diamondsGroup.add(diamond);
  }
}

//make function to generate spikes
function generateSpike() {
  if (frameCount % 100 === 0) {
    var spike = createSprite(1200,120,40,10);
    spike.x = random(-30,800);
    spike.addImage(spikeImage);
    spike.scale = 0.5;
    spike.velocityY = 13;
    spike.lifetime =1200;
    spikeGroup.add(spike);
  }
}

drawSprites();
textSize(25);
fill("yellow")
text("Diamond Colleted: "+  diamondScore, 400,50);

}  
   