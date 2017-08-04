//方案二 采用坐标形式
var command = {
  statusNum: 0,
  status: "left",
  X: 5,
  Y: 5
};
var path = ['left', 'top', 'right', 'bottom'];

function getId(id) {
  return document.getElementById(id);
}
function trim() {
  if (!String.prototype.trim) {
    var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    String.prototype.trim = function() {
      return this.relpace(trim, "");
    };
  }
}
function getDiv() {
  var horizontal = document.getElementsByTagName('tr')[command.Y];
  var vertical = horizontal.getElementsByTagName('td')[command.X];
  return vertical;
}
function movesquare() {
  var goal = getDiv();
  command.status = path.slice(command.statusNum % 4)[0];
  switch (command.status) {
    case 'left':
      command.X -= 1;
      break;
    case 'right':
      command.X += 1;
      break;
    case 'top':
      command.Y -= 1;
    case 'bottom':
      command.Y += 1;
      break;
  }
  if (command.X > 10 || command.X <= 0 || command.Y > 10 || command.Y <= 0) {
    alert('已经到边界了');
    return false;
  } 
  goal.innerHTML = "";
  goal.removeAttribute('id');
  var goal2 = getDiv();
  goal2.innerHTML = "<div></div>";
  goal2.id = 'selected';
}

function run() {
  var value = document.querySelectorAll('input[type=text]')[0].value.trim();
  switch (value) {
    case 'TURN LEF':
      command.statusNum -= 1;
      deg -= 90;
      break;
    case 'TURN RIG':
      command.statusNum += 1;
      deg += 90;
      break;
    case 'TURN BACK':
      deg += 180;
      command.statusNum += 2;
      break;
    case 'GO':
      movesquare();
  }
  getId("selected").style.transform = 'rotate(' + deg + 'deg)';
}

function addEvent(e, event, listener) {
  if (e.addEventListener) {
    e.addEventListener(event, listener, false);
  } else if (e.attachEvent) {
    e.attachEvent("on" + event, listener);
  } else {
    e["on" + event] = listener;
  }
}
var deg = 0;
addEvent(document.querySelectorAll('input[type=submit]')[0], "click", function(e) {
  run();
});