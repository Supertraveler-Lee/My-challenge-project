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

var Spaceship = function() {
  var fly = 0;
  var launch = 0;
};

Spaceship.prototype.fly = function() {

};
Spaceship.prototype.stop = function() {

};
Spaceship.prototype.destroy = function() {

};
Spaceship.prototype.animation = function() {

};



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
      Array.prototype.forEach.call(getClass(item), function(elem, index) {
        addEvent(elem, "click", function() {
          this.cmd = {
            id: index + 1,
            cmd: item + (index + 1)
          };
          console.log(this.cmd);
          Commander.Mediator();
        });
      });
    });
  };
  addButtonEvent();
};

Commander.prototype.Mediator = function() {
  var errRate = 0.3;
  if (Math.random() < errRate) {
    getId('log').innerHTML = "发送的无线电信号未收到...";
    return ;
  };
      
};

Commander = new Commander();
Commander.init();