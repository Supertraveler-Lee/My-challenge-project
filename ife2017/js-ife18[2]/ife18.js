//方案二 采用坐标形式
var command = {
  statusNum : 0,
  status: "left",
  X: 5,
  Y: 5
};
var path = ['left','top','right','bottom'];
function getId(id) {
  return document.getElementById(id);
}
function trim() {
  if(!String.prototype.trim) {
    var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    String.prototype.trim = function() {
      return this.relpace(trim,"");
    }
  }
}
function switchDirect() {

}
function getDiv() {
   var horizontal = document.getElementsByTagName('tr')[Y];
   var vertical = horizontal.getElementsByTagName('td')[X];
   return vertical;
}
function movesquare() {
  getDiv().innerHTML = "";
  command.status = path.slice(command.statusNum%4)[0];
  switch (command.status){
    case 'left':
    command.X-=1;
    break;
    case 'right':
    command.X+=1;
    break;
    case 'top':
    command.Y-=1;
    case 'bottom':
    command.Y+=1;
    break;
  }
  setLocate(X,Y);
} 
function setLocate(X,Y) {
    var horizontal = document.getElementsByTagName('tr')[Y];
    var vertical = horizontal.getElementsByTagName('td')[X];
    var goal = vertical.innerHTML = '<div></div>';
}

function run() {
  var value = document.getSelectorAll('input[type=text]')[0].trim();
  switch (value){
    case 'TURN LEF':
    command.statusNum -=1;
    break;
    case 'TURN RIG':
    command.statusNum +=1;
    break;
    case 'TURN BACK':
    command.statusNum +=2;
    break;
    case 'GO':
    movesquare()
  }
}