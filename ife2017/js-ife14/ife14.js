// 还需要优化、添加必要注释
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

var Commander = function() {
  this.cmd = {};
  this.spacelist = [true];
};

Commander.prototype.init = function() {
  // var buttonCmd = [];
  var newSpaceConsole;
  var that = this;
  addEvent(getId("createspace"), "click", function() {
    var hasDel = false;
    // i++;

    for (var i = 0; i < that.spacelist.length; i++) {
      console.log(that.spacelist);
      console.log(that.spacelist[i]);
      if (!that.spacelist[i]) {
        that.spacelist[i] = true;
        i += 1;
        hasDel = true;
        break;
      }
    };
    if (!hasDel) {
      that.spacelist.push(true);
      i += 1;
    }
    console.log(that.spacelist, i);
    if (that.spacelist.length < 5) {
      newSpaceConsole = getId('control' + i);
      newSpaceConsole.innerHTML = "<p class='spacenumber'>飞船" + i + "号</p> \
                          <button class='tostart'>开始飞行</button>\
                          <button class='tostop'>停止飞行</button>\
                          <button class='destroyspace'>摧毁飞船</button>";
      getId('spacecraft' + i).innerHTML = "<div id = " + 'space' + i + " class='space'><div>";
      getId('space' + i).style.left = (220 + (i - 1) * 120) / 2 - 51 + 'px';
      getId('space' + i).style.top = -16 + 'px';
      getId('log').innerHTML += "<span style='color:blue'>已经创建飞船"+i+"号...</span></br>";
      addButtonEvent();
    } else {
      alert("只有4条轨道 ：(");
    }
  });

  var addButtonEvent = function() {
    var elem = newSpaceConsole || getId('control1');
    console.log(elem);
    var buttonCmd = function() {
      return [].slice.call(elem.getElementsByTagName('button'));
    }();
    console.log(buttonCmd);
    buttonCmd.map(function(item) {
      addEvent(item, "click", function() {
        console.log("再来一次");
        Commander.cmd = {
          id: elem.id.slice(-1),
          handler: item
        };
        console.log(Commander.cmd);
        var timer =setTimeout(function() {
          Mediator.deliver(Commander.cmd);
        },1000); 
      });
    });
  }
  addButtonEvent();
};

var Mediator = function() {

};

Mediator.prototype.deliver = function(cmd) {
  this.errRate = 0.3;
  if (Math.random() < this.errRate) {
    getId('log').innerHTML += "<span style='color:#fff'>发送的无线电信号未收到...</span></br>";
    return;
  }

  var target = getId("space" + (cmd.id));
  // console.log("target:" + target);
  Spacecraft[cmd.id - 1].id = cmd.id;
  Spacecraft[cmd.id - 1].target = target;
  Spacecraft[cmd.id - 1][cmd.handler.className]();
};

var Spacecraft = function() {
  this.degree = 0;
  this.id = null;
  this.target = null;
  this.isFly = false;
  this.inSpace = false;
  this.energy = 100;
  this.currid = null;
};

Spacecraft.prototype.tostop = function() {
  // console.log("please  stop!");
  this.isFly = false;
  this.inSpace = true;
  getId('log').innerHTML += "<span style='color:gray'>停止飞船"+this.id+"号...</span></br>";
};
Spacecraft.prototype.tostart = function() {
  // console.log("please  start!");
  this.inSpace = true;
  this.isFly = true;
  getId('log').innerHTML += "<span style='color:green'>启动飞船"+this.id+"号...</span></br>";
  this.ondraw();

};
Spacecraft.prototype.destroyspace = function() {
  console.log("please  destroyspace!");
  console.log(this.target);
  this.target.parentNode.removeChild(this.target);
  Commander.spacelist[this.id - 1] = false;
  // console.log(Commander.spacelist[this.id]);
  // console.log(Commander.spacelist);
  getId('log').innerHTML += "<span style='color:red'>已经销毁飞船"+this.id+"号...</span></br>";
  getId('control' + this.id).innerHTML = '';

};
Spacecraft.prototype.getLocal = function(degree) {
  var PLANET_RADIUS = 60;
  var ORBIT_ALTITUDE = 51 + (this.id - 1) * 60;
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
  // console.log(x,y);
  return [x, y];
};
Spacecraft.prototype.animation = function() {
  this.target.style.transform = 'rotate(' + this.degree + "deg)";
  var loc = this.getLocal(this.degree);
  this.target.style.left = loc[0] + 'px';
  this.target.style.top = loc[1] + 'px';
};

Spacecraft.prototype.ondraw = function() {
  if (this.id === this.currid) return;
  this.currid = this.id;
  var that = this;
  var timer = setInterval(function() {
    var percent = Math.round(that.energy);

    if (that.isFly) {
      that.consumeEnergy(that.energy);
      if (percent > 0) {
        that.degree += 1;
        that.animation(that.target, that.degree);
      }
    }
    if (percent === 0) {
      that.isFly = false;
    }
    that.solarEnergy(that.energy);
    that.target.innerHTML = percent + "%";
  }, 40);
}
Spacecraft.prototype.solarEnergy = function() {
  if (this.energy < 100) {
    this.energy += 0.07;
    return this.energy;
  };
};
Spacecraft.prototype.consumeEnergy = function() {
  if (this.energy > 0) {
    this.energy -= 0.14;
    return this.energy;
  }
};


Commander = new Commander();
Mediator = new Mediator();
Spacecraft1 = new Spacecraft();
Spacecraft2 = new Spacecraft();
Spacecraft3 = new Spacecraft();
Spacecraft4 = new Spacecraft();
var Spacecraft = [Spacecraft1, Spacecraft2, Spacecraft3, Spacecraft4];
Commander.init();