var timer= null,
    btns = document.getElementsByTagName("button"),
    rootNode = document.getElementById("root"),
    indexBF = 0 ;  //广度自增标识

function addEvent(elem,event,handler) {
  if (elem.addEventListeren) {
    elem.addEventListeren(event,handler,false);
  } else if (elem.attachEvent) {
    elem.attachEvent("on"+event,handler);
  } else {
    elem["on"+event] = handler;
  }
}

function breadthFirst(node,nodeList) {
  if (node) {
    nodeList.push(node);
    breadthFirst(node.nextElementSibling,nodeList);
    node = nodeList[indexBF++];
    breadthFirst(node.firstElementChild,nodeList);
  }
  return nodeList;
}


function depthFirst(node,nodeList) {
  if (node) {
    nodeList.push(node);
    for(var i=0, len=node.children.length; i<len; i++ ) {
      depthFirst(node.children[i],nodeList);
    }
  }
  alert(nodeList);
  return nodeList;
}

function render(nodeList) {
  var len = nodeList.length,
      i = 1;
  
  rootNode.className = "active";
  timer = setInterval(function () {
    if (i<len) {
      nodeList[i-1].className = "";
      nodeList[i].className = "active";
    } else {
      clearInterval(timer);
    }
    i++;
  },500);
}

function reset() {
  divsNodes = document.getElementsByTagName("div");
  divsLen = divsNodes.length;
  for(var i=0; i<divsLen; i++) {
    divsNodes[i].className = "default";
  }
}

addEvent(btns[0], "click", function () {
  var nodeList = [];
  reset();
  depthFirst(rootNode,nodeList);
  render(nodeList);
});

for (var i=0; i<2;i++) {
  var nodeList = [];
  var fn = {
  "0" : depthFirst(rootNode,nodeList),
  // "1" : breadthFirst(rootNode,nodeList)
  };
  // alert(fn[1]);
  addEvent(btns[i], "click", function () {
    var nodeList = [];
    reset();
    fn[i];
    alert(nodeList);
    render(nodeList);
  });
}


