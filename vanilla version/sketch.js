var radars = []
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

setup()
setInterval(function(){ draw() }, 1000/30);

function setup() {
  context.lineWidth = 1;
  context.strokeStyle = 'black';
  createRadars(500,500,20)
}

function draw(){
   context.clearRect(0, 0, canvas.width, canvas.height)
   radars.forEach(function(r){
     r.draw()
     r.update()
   })
}


function Radar(x,y,D,d){
    this.locX = x
    this.locY = y
    this.bigDiam = D
    this.smallDiam = d
    this.angle = x+y
    var radians = this.angle * (Math.PI / 180)
    this.satelliteX = this.locX + this.bigDiam/2*Math.cos(radians)
    this.satelliteY = this.locY + this.bigDiam/2*Math.sin(radians)

    this.update = function() {
      this.angle = this.angle + 5;
      var radians = this.angle * (Math.PI / 180)
      this.satelliteX = this.locX + this.bigDiam/2*Math.cos(radians)
      this.satelliteY = this.locY + this.bigDiam/2*Math.sin(radians)
    }

    this.draw = function(){

      context.beginPath();
      context.arc(this.locX, this.locY, this.bigDiam/2, 0, 2 * Math.PI, false);
      context.fillStyle = 'transparent';
      context.fill();
      context.stroke();

      context.beginPath();
      context.arc(this.satelliteX, this.satelliteY, this.smallDiam/2, 0, 2 * Math.PI, false);
      context.fillStyle = 'black';
      context.fill();
      context.stroke();
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
