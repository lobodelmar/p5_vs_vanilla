var radars = []

function setup() {
  var width = document.getElementById('myCanvas').offsetWidth
  var height = document.getElementById('myCanvas').offsetHeight
  frameRate(30)
  var myCanvas = createCanvas(width, height)
  createRadars(width, height, 20)
  angleMode(DEGREES)
  myCanvas.parent('myCanvas')
  stroke(0)
}

function draw(){
   background(255)
   radars.forEach(function(r){
     r.draw()
     r.update()
   })
  //  if (frameCount % 100==0) console.log(getFrameRate())
}

function Radar(x,y,D,d){
  this.locX = x
  this.locY = y
  this.bigDiam = D
  this.smallDiam = d
  this.angle = x+y

  this.update = function(){
    this.angle = this.angle + 5;
    this.satelliteX = this.locX + this.bigDiam/2*cos(this.angle)
    this.satelliteY = this.locY + this.bigDiam/2*sin(this.angle)
  }

  this.draw = function(){
    noFill()
    ellipse(this.locX,this.locY,this.bigDiam,this.bigDiam)
    fill(0)
    ellipse(this.satelliteX, this.satelliteY,this.smallDiam,this.smallDiam)
  }
}

function createRadars(w, h, diam){
  for (var x=diam/2; x<w; x+=diam){
    for (var y=diam/2; y<h; y+=diam){
      var r = new Radar(x,y,diam,diam/2)
      radars.push(r)
    }
  }
}
