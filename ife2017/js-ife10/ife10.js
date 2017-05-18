var btn = document.getElementsByTagName('button'),
  rootDiv = document.getElementsByTagName('div')[0],
  preBtn = btn[0],
  inBtn = btn[1],
  postBtn = btn[2],
  divList = [],
  timer = null;

function addEvent(ele, event, handler) {
  if (ele.addEventListener) {
    ele.addEventListener(event, handler, false);
  } else if (ele.attachEvent) {
    ele.attachEvent("on" + event, handler);
  } else {
    ele["on" + event] = handler;
  }
}

function preOrder(node) {
  if (!(node == null)) {
    divList.push(node);
    preOrder(node.firstElementChild);
    preOrder(node.lastElementChild);
  }
}
function inOrder(node) {
  if (!(node == null)) {
    inOrder(node.firstElementChild);
    divList.push(node);
    inOrder(node.lastElementChild);
  }
}
function postOrder(node) {
  if (!(node == null)) {
    postOrder(node.firstElementChild);
    postOrder(node.lastElementChild);
    divList.push(node);
  }
}
//代模块化    
function preAction() {
  reset();
  preOrder(rootDiv);
  colorAnimation();
}

function inAction() {
  reset();
  inOrder(rootDiv);
  colorAnimation();
}

function postAction() {
  reset();
  postOrder(rootDiv);
  colorAnimation();
}


function colorAnimation() {
  var i = 0;
  divList[0].style.backgroundColor = "pink";
  timer = setInterval(function() {
    i++;
    if (i < divList.length) {
      divList[i - 1].style.backgroundColor = "#fff";
      divList[i].style.backgroundColor = "pink";
    } else {
      divList[divList.length - 1].style.backgroundColor = "#fff";
      clearInterval(timer);
    }

  }, 500);
}

function reset() {
  divList = [];
  allDiv = document.getElementsByTagName("div");
  for (var i = 0; i < allDiv.length; i++) {
    allDiv[i].style.backgroundColor = "#fff";
  }
}

function init() {
  addEvent(preBtn, "click", preAction);
  addEvent(inBtn, "click", inAction);
  addEvent(postBtn, "click", postAction);
}

init();