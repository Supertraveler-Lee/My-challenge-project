var 
    number = document.getElementsByClassName("number")[0],
    unshift = document.getElementById("unshift"),
    shift = document.getElementById("shift"),
    push = document.getElementById("push"),
    pop = document.getElementById("pop"),
    data = [];

function getValue () {
  var your_value = document.getElementsByTagName("input")[0].value;
  document.getElementsByTagName("input")[0].value = '';
  if ((/^[0-9]+$/).test(your_value)) {
    return your_value;
  } else {
    alert("你输入的数字不合法：(");
  }
}

function renderData () {
  number.innerHTML = '';
  for (var i = 0; i < data.length; i++) {
    number.innerHTML += `<div class="queue">${data[i]}</div>`;  
  }
}
function addEvent (ele,event,handler) {
  if (ele.addEventListener) {
    ele.addEventListener(event,handler,false);
  } else if (ele.attachEvent) {
    ele.attachEvent("on"+event,handler);
  } else {
    ele["on"+event] = handler;
  }
}

addEvent(unshift,'click',function () {
  var value = getValue();
  if (value !== undefined) {
    data.unshift(value);
    renderData();
  } 
},false);

addEvent(shift,'click',function () {
    data.shift();
    renderData();
},false);

addEvent(push,'click',function () {
  var value = getValue();
  if (value !== undefined) {
    data.push(value);
    renderData();
  }
},false);

addEvent(pop,'click',function () {
    data.pop();
    renderData();
},false);

