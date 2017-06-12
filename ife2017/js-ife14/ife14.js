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
function getElemTarget(id,className) {
  return getId('control'+id).getElementsByClassName(className)[0];
}

var Commander = function() {
  this.cmd = {};
};

Commander.prototype.init = function() {
  var i = 1;
  var buttonCmd = [];
  addEvent(getId("createspace"), "click", function() {
    ++i;
    if (i < 5) {
      var newspace = document.createElement("div");
      newspace.className = "single-control";
      newspace.id = "control" + i;
      newspace.innerHTML = "<p class='spacenumber'>飞船" + i + "号</p> \
                          <button class='tostart'>开始飞行</button>\
                          <button class='tostop'>停止飞行</button>\
                          <button class='destryspace'>摧毁飞船</button>";
      getId("console").appendChild(newspace);
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
          console.log(Commander.cmd);
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
      console.log('xxx'+cmd.id);
      var target = getElemTarget(index+1,item.className);
      Spacecraft[cmd.handler](target);
    }   
  });
};

var Spacecraft = function() {

};

Spacecraft.prototype.tostop = function(target) {
  console.log("please  stop!");
};
Spacecraft.prototype.tostart = function(target) {
  console.log("please  start!");
  console.log(target);
  Spacecraft.animation(target);

};
Spacecraft.prototype.destryspace = function(target) {
  console.log("please  destryspace!");
};
Spacecraft.prototype.getLocal = function() {
  var PLANET_RADIUS = 111;
  var ORBIT_ALTITUDE = 61;
  var Spacecraft_WIDTH = 100;
  var Spacecraft_HEIGHT = 30;
  var z = Spacecraft_WIDTH + Spacecraft_HEIGHT;
  var x = Math.sin(Math.PI * 2 * this.degree) * z;
  var y = Math.cos(Math.PI * 2 * this.degree) * -z;
  x += PLANET_RADIUS - Spacecraft_WIDTH;
  y += PLANET_RADIUS - Spacecraft_HEIGHT;
  console.log(x,y);
  return [x,y];
};
Spacecraft.prototype.animation = function(target) {
  this.degree = 0;
  target.style.transform = 'rotate('+ this.degree + "deg)";
  var loc = this.getLocal();
  target.style.left = loc[0] + 'px';
  target.style.right = loc[1] + 'px';
};

Commander = new Commander();
Mediator = new Mediator();
Spacecraft = new Spacecraft();
Commander.init();