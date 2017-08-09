var command = {
  deg: 0,
  status: "LEF",
  X: 5,
  Y: 5
};
var path = ['LEF', 'TOP', 'RIG', 'BOT', "BACK"];
var action = ['TURN ', 'TRA ', 'MOVE '];

function getId(id) {
  return document.getElementById(id);
}

function animate(eachDeg,callback) {
  var timer = setInterval(frame, 300);
  var id = 1;
  function frame() {
    if (id > 3) {
      command.status = path[command.deg/90];
      clearInterval(timer);
      callback();
    } else {
      command.deg += eachDeg / 3;
      getId('selected').style.transform = "rotate(" + command.deg + "deg)";
      id++;
    }
  }
}

function trim() {
  if (!String.prototype.trim) {
    var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    String.prototype.trim = function() {
      return this.relpace(rtrim, "");
    };
  }
}

function getDiv() {
  var horizontal = document.getElementsByTagName('tr')[command.Y];
  var vertical = horizontal.getElementsByTagName('td')[command.X];
  return vertical;
}

function checkBoard() {
  if (command.X > 10 || command.X <= 0 || command.Y > 10 || command.Y <= 0) {
    alert('已经到边界了');
    return false;
  } else {
    return true;
  }
}

function move1Unit(index, value) {
  var goalDiv = getDiv();
  var tempdeg = [command.X, command.Y];
  switch (value) {
    case action[index] + path[0]:
      command.X -= 1;
      break;
    case action[index] + path[1]:
      command.Y -= 1;
      break;
    case action[index] + path[2]:
      command.X += 1;
      break;
    case action[index] + path[3]:
      command.Y += 1;
      break;
  }
  if (!checkBoard()) {
    command.X = tempdeg[0];
    command.Y = tempdeg[1];
    return false;
  }
  goalDiv.innerHTML = "";
  goalDiv.removeAttribute('id');
  var goalDiv2 = getDiv();
  goalDiv2.innerHTML = "<div></div>";
  goalDiv2.style.transform = "rotate("+command.deg+"deg)";
  goalDiv2.id = 'selected';
}

function turnSquare(value) {
  switch (value) {
    case action[0] + path[0]:
      animate(-90);
      break;
    case action[0] + path[2]:
      animate(90);
      break;
    case action[0] + path[4]:
      animate(180);
      break;
    case 'GO':
      command.status = path[((command.deg % 360 + 360) % 360)/90];
      move1Unit(0, action[0] + command.status);
  }
}

function traSquare(value) {
  move1Unit(1, value);
}

function moveSquare(value) {
  var diff;
  command.deg = (command.deg % 360 + 360) % 360;
  if(action[2]+command.status !== value){
    switch (value) {
      case action[2] + path[0]:
        diff = 0 - command.deg;
        break;
      case action[2] + path[1]:
        diff = 90 - command.deg;
        break;
      case action[2] + path[2]:
        diff = 180 - command.deg;
        break;
      case action[2] + path[3]:
        diff = 270 - command.deg;
        break;
    }
    animate(diff,function(){move1Unit(2,value)});
  } else {
  move1Unit(2,value);
  } 
}

function run() {
  var value = document.querySelectorAll('input[type=text]')[0].value.trim();
  if (value.indexOf(action[0]) !== -1 || value === "GO") {
    turnSquare(value);
  } else if (value.indexOf(action[1]) !== -1) {
    traSquare(value);
  } else if (value.indexOf(action[2]) !== -1) {
    moveSquare(value);
  }
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
addEvent(document.querySelectorAll('input[type=submit]')[0], "click", function(e) {
  run();
});