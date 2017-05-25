var timer = null,
    lock = false,
    btns = document.getElementsByTagName("button"),
    input = document.getElementsByTagName("input")[0],
    rootNode = document.getElementById("root"),
    indexBF = 0; //广度自增标识

function addEvent(elem, event, handler) {
  if (elem.addEventListeren) {
    elem.addEventListeren(event, handler, false);
  } else if (elem.attachEvent) {
    elem.attachEvent("on" + event, handler);
  } else {
    elem["on" + event] = handler;
  }
}

function breadthFirst(node, nodeList) {
  if (node) {
    nodeList.push(node);
    breadthFirst(node.nextElementSibling, nodeList);
    node = nodeList[indexBF++];
    breadthFirst(node.firstElementChild, nodeList);
  }
  return nodeList;
}


function depthFirst(node, nodeList) {
  if (node) {
    nodeList.push(node);
    for (var i = 0, len = node.children.length; i < len; i++) {
      depthFirst(node.children[i], nodeList);
    }
  }
  return nodeList;
}

function render(nodeList,input) {
  var len = nodeList.length,
      value = input.toLowerCase() || null,
      i = 1;
  console.log(nodeList);
  lock = true;
  rootNode.className = "active";
  timer = setInterval(function() {
    if (i < len) {
      var elemText = nodeList[i-1].firstChild.nodeValue.toLowerCase().replace(/^\s+|\s+$/g,"")
      if ( value !== elemText ) {
        nodeList[i - 1].className = "";
        nodeList[i].className = "active";
      } else {
        nodeList[i-1].className = "select";
        clearInterval(timer);
        lock = false;
      }
    } else {
      nodeList[len - 1].className = "default";
      clearInterval(timer);
      lock = false;
    }
    i++;
  }, 500);
  
}

function reset() {
  divsNodes = document.getElementsByTagName("div");
  divsLen = divsNodes.length;
  for (var i = 0; i < divsLen; i++) {
    divsNodes[i].className = "default";
  }
}

function buttons(index,nodeList) {
  var toDepthFirst = function() {
      depthFirst(rootNode, nodeList);
    };
  var toBreadthFirst = function() {
      breadthFirst(rootNode, nodeList);
    };
  var button = {
    "0" : toDepthFirst,
    "1" : toBreadthFirst,
    "2" : toDepthFirst,
    "3" : toBreadthFirst
  };
  if (typeof button[index] !== "function") {
    throw new Error("invalid index");
  }
  return button[index]();
}

function init () {
  for (var i = 0; i < btns.length; i++) {
    var nodeList= [];
    (function(i) {
      addEvent(btns[i], "click", function() {
        if (lock === true) {
          alert("正在遍历，请稍等...");
        } else {
          value = input.value;
          reset();
          buttons(i,nodeList);
          render(nodeList,value);
          nodeList = [];
          indexBF = 0;
        }        
      });
    }(i));
  };
}
init();