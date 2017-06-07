
var width = 100;
var height = 30;
var z = 120;


// var elem = document.getElementById("space1");
// elem.style.top = (Math.round(y))+'px';
// elem.style.left = (Math.round(x))+'px';

var elem = document.getElementById("space1");
// elem.style.top = -15;
// elem.style.left = 65;
function ele() {
  this.deg = 0;

  elem.style.top = -15+'px';
  var top = -15;
  var left = 65;
  elem.style.left = 222/2-100/2+'px';
  var timer = setInterval(function () {
   this.deg += 1; 
    var x = Math.sin(this.deg*2*Math.PI/360)*z;
    var y = Math.cos(this.deg*2*Math.PI/360)*z*(-1);
   elem.style.transform = 'rotate('+this.deg+'deg)';
   x += 122 - 15;
   y+= 122 - 50;
   elem.style.top = -15+x+'px';
   elem.style.left = 65+y+'px';
   console.log(x,y);
   console.log(elem.style.top);
   console.log(elem.style.left);

   if (this.deg >360) {
    clearInterval(timer);
   }
   console.log(this.deg);
  },100);
}
ele();