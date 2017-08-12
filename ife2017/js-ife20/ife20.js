(function() {
  var path = ['LEF', 'TOP', 'RIG', 'BOT', "BACK"];
  var action = ['TUN ', 'TRA ', 'MOV '];
  var textarea = document.getElementsByTagName('textarea')[0];
  var rowId = document.getElementById('rowId');
  var selected = document.getElementById('selected');
  var button = document.getElementsByTagName('button');
  var command = {
    value: null,
    deg: 0,
    direct: "LEF",
    X: 5,
    Y: 5
  };

  function trim() { //去除空白
    if (!String.prototype.trim) {
      var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
      String.prototype.trim = function() {
        return this.relpace(rtrim, "");
      };
    }
  }

  function animate(eachDeg, callback) { //转动对应角度
    var timer = setInterval(frame, 100);
    var id = 1;

    function frame() {
      if (id > 3) {
        command.direct = path[command.deg / 90];
        clearInterval(timer);
        callback ? callback() : null;
      } else {
        command.deg += eachDeg / 3;    //旋转所有角度都以三次为主
        selected.style.transform = "rotate(" + command.deg + "deg)";
        id++;
      }
    }
  }

  function moveAnimate(originLocal, length, margin) { //移动动画
    var id = 1;
    var newLocal = 0;
    var timer2 = setInterval(function() {
      if (id > Math.abs(length)) {
        clearInterval(timer2);
      } else {
        newLocal += Math.sign(length) * 36.65;
        selected.style[margin] = (originLocal * 36.65 + newLocal) + 'px';
        id++;
      }
    }, 100);
  }

  function checkBoard(tempLocal) { //检查是否在边界
    if (command.X > 10 || command.X <= 0 || command.Y > 10 || command.Y <= 0) {
      command.X = tempLocal[0];
      command.Y = tempLocal[1];
      alert('已经到边界了');
    } else {
      return true;
    }
  }

  function moveUnitN(index, length) { //移动N格 
    length = length || 1;
    var tempLocal = [command.X, command.Y];
    switch (command.value) {
      case action[index] + path[0]:
        command.X -= length;
        checkBoard(tempLocal) ? moveAnimate(tempLocal[0], -length, 'marginLeft') : false;
        break;
      case action[index] + path[1]:
        command.Y -= length;
        checkBoard(tempLocal) ? moveAnimate(tempLocal[1], -length, 'marginTop') : false;
        break;
      case action[index] + path[2]:
        command.X += +length;
        checkBoard(tempLocal) ? moveAnimate(tempLocal[0], length, 'marginLeft') : false;
        break;
      case action[index] + path[3]:
        command.Y += +length;
        checkBoard(tempLocal) ? moveAnimate(tempLocal[1], length, 'marginTop') : false;
        break;
    }
    if (!checkBoard()) {
      command.X = tempLocal[0];
      command.Y = tempLocal[1];
      return false;
    }
  }

  function turnSquare(length) { //TUN命令
    switch (command.value) {
      case action[0] + path[0]:
        animate(-90);
        break;
      case action[0] + path[2]:
        animate(90);
        break;
      case action[0] + path[4]:
        animate(180);
        break;
      case "GO":
        command.direct = path[((command.deg % 360 + 360) % 360) / 90];
        command.value = action[0] + command.direct;
        moveUnitN(0, length);
    }
  }

  function traSquare(length) { //TRA命令
    moveUnitN(1, length);
  }

  function moveSquare(length) { //MOV命令
    var diff;
    command.deg = (command.deg % 360 + 360) % 360;
    if (action[2] + command.direct !== command.value) {
      switch (command.value) {
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
      animate(diff, function() {
        moveUnitN(2, length);
      });
    } else {
      moveUnitN(2, length);
    }
  }

  function checkName(i) { //检查名字是否合规
    console.log(command.value);
    var value = command.value.trim().split(/\s/);
    if (action.indexOf(value[0] + " ") === -1 && value[0] !== "GO") {  
      rowId.getElementsByTagName('div')[i].className = 'error';    //不合规就标红
    }
    console.log(value[0],value);
  }

  function hasRowChange() {
    var value = textarea.value.split('\n');
    var arr = [];
    var top = textarea.scrollTop;
    for (var i = 1; i < value.length + 1; i++) {
      arr.push('<div>' + i + '</div>');
    }
    rowId.innerHTML = arr.join("");
    rowId.scrollTop = top;
  }

  function readTextarea() { //读取textarea
    var i = 0;
    var value = textarea.value.trim().split('\n');
    var timer3 = setInterval(function() {
      if (i < value.length) {
        command.value = value[i].trim();
        run(i);
        i++;
      } else {
        clearInterval(timer3);
      }
    }, 500);

  }

  function run(i) {
    var length;
    if (command.value.match(/(\d+)/g)) {          //验证并取出数字
      length = command.value.match(/\d+/g)[0];
      command.value = command.value.split(/\d+/)[0].trim();
    }
    checkName(i);
    if (command.value.indexOf(action[0]) !== -1 || command.value === "GO") {   //TUN 命令
      turnSquare(length);
    } else if (command.value.indexOf(action[1]) !== -1) {   //TRA 命令 
      traSquare(length);
    } else if (command.value.indexOf(action[2]) !== -1) {  //MOV 命令
      moveSquare(length);
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
  addEvent(textarea, 'keyup', function() {
    hasRowChange();
  });
  addEvent(textarea, 'scroll', function() {
    var top = textarea.scrollTop;
    rowId.scrollTop = top;
  });
  addEvent(button[0], "click", function(e) {
    readTextarea();
  });
  addEvent(button[1],'click',function(){
    rowId.innerHTML = "";
    textarea.value = "";
  });
})();