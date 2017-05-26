var timer = null,
  lock = false,
  btns = $("button"),
  input = $("input"),
  divs = $("div"),
  rootNode = document.getElementById("root"),
  selected = document.getElementsByClassName("selected")[0];
  indexBF = 0; //广度自增标识

function $(classElem) {
  return document.getElementsByTagName(classElem);
}

// function getSelected() {
//   return document.getElementsByClassName("selected")[0];
// }

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

function render(nodeList, value) {
  var len = nodeList.length,
    value = value.toLowerCase() || null,
    i = 1;
  console.log(nodeList);
  lock = true;
  rootNode.className = "active";
  timer = setInterval(function() {
    if (i < len) {
      var elemText = nodeList[i - 1].firstChild.nodeValue.toLowerCase().replace(/^\s+|\s+$/g, "")
      if (value !== elemText) {
        nodeList[i - 1].className = "default";
      } else {
        nodeList[i - 1].className = "match";
      }
      nodeList[i].className = "active";
    } else {
      nodeList[len - 1].className = "default";
      clearInterval(timer);
      lock = false;
    }
    i++;
  }, 500);

}

function reset() {
  divsLen = divs.length;
  for (var i = 0; i < divsLen; i++) {
    // if (divs[i].className === "selected") {
    //   divs[i].className = "selected";
    // } else {
      divs[i].className = "default";
    // }
  }
}

for (var i = 0, divsLen = divs.length; i < divsLen; i++) {
    addEvent(divs[i], "click", function() {
      reset();
      this.className = "selected";
      event.stopPropagation();
      selected = this;
  });
};


function delButton() {
  if (selected === undefined) {
    alert("未选中元素");
  } else {
    selected.parentElement.removeChild(selected);
  }
}

function addButton() {
  if (selected === undefined) {
    alert("未选中元素");
  } else {
    var value = input[1].value;
          if (!value) {
      alert("未填写元素");
    } else {
      selected.innerHTML += `<div class="default">${value}</div>`;
    }
  }
}

function buttons(index, nodeList) {
  var toDepthFirst = function() {
      depthFirst(rootNode, nodeList);
    },
    toBreadthFirst = function() {
      breadthFirst(rootNode, nodeList);
    };
  var button = {
    "0": toDepthFirst,
    "1": toBreadthFirst,
    "2": toDepthFirst,
    "3": toBreadthFirst
  };
  if (typeof button[index] !== "function") {
    throw new Error("invalid index");
  }
  return button[index]();
}

function init() {
  for (var i = 0; i < 4; i++) {
    var nodeList = [];
    (function(i) {
      addEvent(btns[i], "click", function() {
        if (lock === true) {
          alert("正在遍历，请稍等...");
        } else {
          value = input[0].value;
          reset();
          buttons(i, nodeList);
          render(nodeList, value);
          nodeList = [];
          indexBF = 0;
        }
      });
    }(i));
  };
  addEvent(btns[4], "click", function() {
    delButton();
  });
  addEvent(btns[5], "click", function() {
    addButton();
  });
}



init();