

var database;
var dog,sadDog,happyDog;
var button,button1;
var foodS,foodStock;
var foodObj;
var lastFed;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy.png");

}

function setup() {
  createCanvas(1000,400);
  database=firebase.database()
  foodObj=new Food();
  button = createButton("Feed the Dog")
  button1 = createButton("Add Food")
  button.position(800,95)
 button1.position(700,95)
  dog=createSprite(800,200,150,150);
  dog.addImage(happyDog);
  dog.scale=0.18;
 database.ref("food") .on("value",readStock)


button.mousePressed(feedDog)
button1.mousePressed(addFood);


}

function draw() {
  background(46,139,87);
foodObj.display()

 database.ref("FeedTime").on("value",(data)=>{
   lastFed=data.val()
 })
 
if(lastFed>12){
  text("Last Fed: "+lastFed%12 +"PM",350,30)
}
else if(lastFed==0){
  text("LastFeed:12 AM",350,30)
}
else{
  text("Last Fed: "+lastFed +"AM",350,30)
}
  drawSprites();


}
function readStock(data){
foodS=data.val();
  foodObj.updateFoodStock(foodS)
}

function feedDog(){
dog.addImage(sadDog)
foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref("/").update({
  food:foodObj.getFoodStock(),
  FeedTime:hour()
})
}
  
function addFood(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}



