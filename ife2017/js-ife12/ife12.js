var timer = null,
  lock = false,
  btns = $("button"),
  input = $("input"),
  divs = $("div"),
  rootNode = document.getElementById("root"),
  indexBF = 0; //广度自增标识

function $(classElem) {
  return document.getElementsByTagName(classElem);
}

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
  //广度优先遍历
  if (node) {
    nodeList.push(node);
    breadthFirst(node.nextElementSibling, nodeList);
    node = nodeList[indexBF++];
    breadthFirst(node.firstElementChild, nodeList);
  }
  return nodeList;
}

function depthFirst(node, nodeList) {
  //深度优先遍历
  if (node) {
    nodeList.push(node);
    for (var i = 0, len = node.children.length; i < len; i++) {
      depthFirst(node.children[i], nodeList);
    }
  }
  return nodeList;
}

function render(nodeList, value) {
  //渲染
  var len = nodeList.length,
    value = value.toLowerCase() || null,
    i = 1;
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
  //重置所有div为白色
  divsLen = divs.length;
  for (var i = 0; i < divsLen; i++) {
    divs[i].className = "default";
  }
}

function traversal(node) {
  //遍历事件——单击变色
  var nodeList = [];
  begatsList = depthFirst(node, nodeList);
  console.log(begatsList);
  for (var i = 0, divsLen = begatsList.length; i < divsLen; i++) {
    addEvent(begatsList[i], "click", function() {
      reset();
      this.className = "selected";
      event.stopPropagation();
      selected = this;
    });
  };
}

function delButton() {
  //删除按钮事件
  if (selected === undefined) {
    alert("未选中元素");
  } else {
    selected.parentElement.removeChild(selected);
  }
}

function addButton() {
  //添加按钮时间
  if (selected === undefined) {
    alert("未选中元素");
  } else {
    var value = input[1].value;
    if (!value) {
      alert("未填写元素");
    } else {
      selected.innerHTML += `<div class="default">${value}</div>`;
      traversal(selected);  //更新节点
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
  //初始化
  traversal(rootNode);
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