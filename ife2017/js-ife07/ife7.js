var data = [];
  var number = document.getElementsByClassName("number")[0];

  function $ (id) {
    return document.getElementById(id);
  }

  function getValue () {
    var your_value = document.getElementsByTagName("input")[0].value;
    document.getElementsByTagName("input")[0].value = '';
    if (your_value >= 10 && your_value <= 100) {
      return your_value;
    } else {
      alert("请输入正确的数字：(");
    }
  }
  function renderData () {
    number.innerHTML = '';
    for (var i = 0; i < data.length; i++) {
      number.innerHTML += `<li class="queue" style="height: ${data[i]*2}px"></li>`;  
    }
  }

  function bubble (queue) {
    eles = document.querySelectorAll("li");
    var 
        i = 0,
        j = 1, 
        timer = null, 
        delay = 50,
        len = eles.length;
    timer = setInterval(run,10);
    function run() {
      if(i < len) {
        if (j < len) {
          if (data[i] > data[j]) {
            temp = data[i];
            data[i] = data[j];
            data[j] =  temp;
            renderData();
          }
          j++;
        } else {
            i++;
            j = i + 1;
          } 
      } else {
        clearInterval(timer);
        return;
        }
      }
    }

  function shuffle (array) {
    var currentIndex = array.length, temporaryValue, randomValue;

    while (0!==currentIndex) {
      randomValue = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomValue];
      array[randomValue] = temporaryValue;
    }
    return array;
  }

  function random30 () {
    var i = 0, data = [];
    while (i < 30) {
      randomNum = Math.floor(Math.random() * (100 - 10 + 1) + 10);
      data.push(randomNum);
      i++;
    }
    return data;
  }

  function addEvent (ele,handler,event = "click") {
    if (ele.addEventListener) {
      ele.addEventListener(event,handler,false);
    } else if (ele.attachEvent) {
      ele.attachEvent("on"+event,handler);
    } else {
      ele["on"+event] = handler;
    }
  }

  addEvent($("unshift"),function () {
    var value = getValue();
    if (value !== undefined) {
      data.unshift(value);
      renderData();
    } 
  });

  addEvent($("push"),'click',function () {
    var value = getValue();
    if (value !== undefined) {
      data.push(value);
      renderData();
    }
  });

  addEvent($("shift"),function () {
      data.shift();
      renderData();
  });

  addEvent($("pop"),function () {
      data.pop();
      renderData();
  });

  addEvent($("bubble"),function () {
    bubble();
  });

  addEvent($("shuffle"),function () {
    shuffle(data);
    renderData();
  });

  addEvent($("random30"),function () {
    data = random30();
    renderData(data);
  });