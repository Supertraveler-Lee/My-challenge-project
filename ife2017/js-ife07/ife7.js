function $ (id) {
  return document.getElementById(id);
}
var data = [];
var number = document.getElementsByClassName("number")[0];

function getValue () {
  var your_value = document.getElementsByTagName("input")[0].value;
  document.getElementsByTagName("input")[0].value = '';
  if (your_value >= 10 && your_value <= 100) {
    return your_value;
  } else {
    alert("请输入正确的数字：(");
  }
}
function renderData (value) {
  number.innerHTML = '';
  for (var i = 0; i < data.length; i++) {
    number.innerHTML += `<li class="queue" style="height: ${data[i]*2}px"></li>`;  
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

addEvent($("unshift"),'click',function () {
  var value = getValue();
  if (value !== undefined) {
    data.unshift(value);
    renderData();
  } 
},false);

addEvent($("shift"),'click',function () {
    data.shift();
    renderData();
},false);

addEvent($("push"),'click',function () {
  var value = getValue();
  if (value !== undefined) {
    data.push(value);
    renderData();
  }
},false);

addEvent($("pop"),'click',function () {
    data.pop();
    renderData();
},false);


function bubble (queue) {
  eles = document.querySelectorAll("li");
  var 
      i, j, timer, 
      delay = 50,
      len = eles.length;

  for (i = 0; i < len - 1; i++) {
    for (j = 0; j < len - 1 - i; j++) {
      if(eles[j].offsetHeight > eles[j+1].offsetHeight) {
          setInterval(function () {
            eles[j].parentNode.insertBefore(eles[j+1],eles[j]);
          },delay);
        
      }
    }
  }
  // timer = setInterval(function () {
  //   if (i < 1 || j > len-2) {
  //     clearInterval(timer);
  //     return ;
  //   }

  //   if (eles[j].offsetHeight > eles[j+1].offsetHeight) {
  //     eles[j].parentNode.insertBefore(eles[j+1],eles[j]);
  //   }
  //   j++;
  // },delay);

}

addEvent($("bubble"),"click",function () {
  bubble();
},false);