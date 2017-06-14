function addEvent(elem, event, handler) {
  if (elem.addEventListener) {
    elem.addEventListener(event, handler, false);
  } else if (elem.attachEvent) {
    elem.attachEvent("on" + event, handler);
  } else {
    elem["on" + event] = handler;
  }
}

function getId(id) {
  return document.getElementById(id);
}

function getClass(className) {
  return document.getElementsByClassName(className);
}

// function getElemTarget(id, className) {
//   return getId('control' + id).getElementsByClassName(className)[0];
// }

var Commander = function() {
  this.cmd = {};
};

Commander.prototype.init = function() {
  var i = 1;
  var buttonCmd = [];
  addEvent(getId("createspace"), "click", function() {
    ++i;
    if (i < 5) {
      var newSpaceConsole = document.createElement("div");
      newSpaceConsole.className = "single-control";
      newSpaceConsole.id = "control" + i;
      newSpaceConsole.innerHTML = "<p class='spacenumber'>飞船" + i + "号</p> \
                          <button class='tostart'>开始飞行</button>\
                          <button class='tostop'>停止飞行</button>\
                          <button class='destryspace'>摧毁飞船</button>";
      getId("console").appendChild(newSpaceConsole);
      getId('spacecraft'+i).innerHTML = "<div id = " + 'space' + i + " class='space'><div>";
      getId('space'+i).style.left = (220+(i-1)*120)/2-51+'px';
      getId('space'+i).style.top = -16+'px';
      buttonCmd = [];
      addButtonEvent();
    } else {
      alert("只有4条轨道 ：(");
    }
  });
  var addButtonEvent = function() {
    Array.prototype.forEach.call(getId('control1').getElementsByTagName("button"), function(item) {
      buttonCmd.push(item.className);
    });
    buttonCmd.map(function(item) {
      var buttonClass = getClass(item);
      Array.prototype.forEach.call(buttonClass, function(elem, index) {
        addEvent(elem, "click", function() {
          Commander.cmd = {
            id: index + 1,
            handler: item
          };
          // console.log(Commander.cmd);
          Mediator.deliver(buttonClass, Commander.cmd);
        });
      });
    });
  };
  addButtonEvent();
};

var Mediator = function() {

};

Mediator.prototype.deliver = function(buttonClass, cmd) {
  this.errRate = 0.3;
  if (Math.random() < this.errRate) {
    getId('log').innerHTML = "发送的无线电信号未收到...";
    return;
  }
  Array.prototype.forEach.call(buttonClass, function(item, index) {
    if (cmd.id === (index + 1)) {
      // console.log('xxx' + cmd.id);
      // var target = getElemTarget(index + 1, item.className);
      console.log("space"+(index+1));
      var target = getId("space"+(index+1));
      console.log("target:"+target);
      var Spacecraft = new Spacecraft();
      Spacecraft.id = cmd.id;
      Spacecraft.target = target;
      Spacecraft[cmd.handler]();
    }
  });
};

var Spacecraft = function() {
  this.degree = 0;
  this.id = null;
  this.target = null;
  this.isFly = false;
  this.inSpace = false;
};

Spacecraft.prototype.tostop = function() {
  console.log("please  stop!");
  this.isFly = false;
};
Spacecraft.prototype.tostart = function() {
  console.log("please  start!");
  console.log(this.target);
  // console.log(target);
  this.inSpace = true;
  this.isFly = true;
  Spacecraft.ondraw(this.target);

};
Spacecraft.prototype.destroyspace = function() {
  console.log("please  destryspace!");
};
Spacecraft.prototype.getLocal = function(degree) {
  var PLANET_RADIUS = 60;
  var ORBIT_ALTITUDE = 51+ (this.id-1)* 60;
  var Spacecraft_WIDTH = 100;
  var Spacecraft_HEIGHT = 30;
  var z = PLANET_RADIUS + ORBIT_ALTITUDE;
  var x = Math.sin(Math.PI * 2 * degree / 360) * z;
  var y = Math.cos(Math.PI * 2 * degree / 360) * z * -1;
  x = Math.round(x);
  y = Math.round(y);
  x += z - Spacecraft_WIDTH / 2;
  y += z - Spacecraft_HEIGHT / 2;
  x = Math.round(x);
  y = Math.round(y);
  console.log(x, y);
  return [x, y];
};
Spacecraft.prototype.animation = function() {
  // console.log("target:"+target);
  this.target.style.transform = 'rotate(' + this.degree + "deg)";
  var loc = this.getLocal(this.degree);
  this.target.style.left = loc[0] + 'px';
  this.target.style.top = loc[1] + 'px';
};
Spacecraft.prototype.ondraw = function() {
  var timer = setInterval(function() {
    Spacecraft.degree += 1;
    Spacecraft.animation(this.target, this.degree);
    if (Spacecraft.degree > 90) {
      clearInterval(timer);
    }
  }, 400);
}
Spacecraft.prototype.solarEnergy = function(energy) {
  if (this.inSpace) {
    if (energy< 100) {
      var timer = setInterval(function() {
        energy += 2;
        target.textContent = energy;
      },100);
    } else {
      clearInterval(timer);
    }
  }
};
Spacecraft.prototype.consumeEnergy = function(target,energy) {

} 


Commander = new Commander();
Mediator = new Mediator();
Spacecraft = new Spacecraft();
Commander.init();
// Spacecraft.ondraw();