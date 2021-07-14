var bg, backgroundImg;
var stoneGroup, stoneImage;

function preload() {
  backgroundImg = loadImage("images/bg.jpg");
  ironManImage = loadImage("images/iron.png");
  stoneImage = loadImage("images/stone.png");
}

function setup() {
  createCanvas(1000, 900);
  bg = createSprite(580,500);
  bg.addImage(backgroundImg);
  bg.scale =2;

  ironMan = createSprite(200,505,20,50);
  ironMan.addImage(ironManImage);
  ironMan.scale=0.3;
  ironMan.debug=true;
  ironMan.setCollider("rectangle",100,0,200,400)
  
  stoneGroup = new Group();

}

function draw() {
  if (keyDown("up")) {
    ironMan.velocityY = -10;
  }
  if (keyDown("left")) {
    ironMan.x = ironMan.x - 5;
  }
  if (keyDown("right")) {
    ironMan.x = ironMan.x + 5;
}

generateStone();

ironMan.velocityY = ironMan.velocityY + 0.5;

for(var i = 0 ; i< (stoneGroup).length ;i++){
  var temp = (stoneGroup).get(i) ;
  
  if (temp.isTouching(ironMan)) {
     ironMan.collide(temp);
    }     
  }

  if(ironMan.x<20){
    ironMan.x=20;
  }

  if(ironMan.y<100){
    ironMan.y=100;
  }
  

function generateStone() {
  if (frameCount % 100 === 0) {
    var stone = createSprite(1200,120,40,10);
    stone.x = random(50,450);
    stone.addImage(stoneImage);
    stone.scale = 1;
    stone.velocityY = 5;
    stone.lifetime =250;
    stoneGroup.add(stone);
  }
}
 
    
    drawSprites();
   
}

