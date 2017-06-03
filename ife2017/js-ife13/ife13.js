//封装TreeNode
function TreeNode(obj) {
  this.data = obj.data || "";
  this.childs = obj.childs || [];
  this.parent = obj.parent;
  this.selfElement = obj.selfElement;
  this.selfElement.TreeNode = this;
}

TreeNode.prototype = {
  constructor: TreeNode,
  render: function(arrow, visibility, highLight, deHighLight) {
    if (arguments < 3) {
      highLight = false;
      deHighLight = false;
    }
    if (arrow) {
      if (this.isLeaf()) {
        this.selfElement.getElementsByClassName("arrow")[0].className = "arrow empty-arrow";
      } else if (this.isFolded()) {
        this.selfElement.getElementsByClassName("arrow")[0].className = "arrow right-arrow";
      } else {
        this.selfElement.getElementsByClassName("arrow")[0].className = "arrow down-arrow";
      }
    }
    if (visibility) {
      if (this.selfElement.className.indexOf("visible") === -1) {
        this.selfElement.className = this.selfElement.className.replace("hidden", "visible");
      } else {
        this.selfElement.className = this.selfElement.className.replace("visible", "hidden");
      }
    }
    if (highLight) {
      this.selfElement.getElementsByClassName("menu-title")[0].className = "menu-title highLight";
    }
    if (deHighLight) {
      this.selfElement.getElementsByClassName("menu-title")[0].className = "menu-title";
    }
  },
  addChild: function(value) {
    if (value.trim() === "") {
      alert("输入内容不能为空");
      return this;
    }
    if (!this.isLeaf() && this.isFolded()) {
      this.toggleFold();
    }

    var newNode = document.createElement("div");
    newNode.className = "visible";
    newNode.innerHTML = `<label class='menu-label'><div class='arrow down-arrow'></div><span class='menu-title'>${value}</span><img class='addIcon' src='add.png'><img class='delIcon' src='delete.png'></label>`
    this.selfElement.appendChild(newNode);
    this.childs.push(new TreeNode({
      parent: this,
      childs: [],
      data: value,
      selfElement: newNode
    }));
    this.childs.forEach(function(item) {
      item.render(true, false);
    });
    return this;
  },
  delChild: function() {
    if (!this.isLeaf()) {
      for (var i = 0; i < this.childs.length; i++) {
        this.childs[i].delChild();
      }
    }
    this.parent.selfElement.removeChild(this.selfElement);
    for (i = 0; i < this.parent.childs.length; i++) { // 从父节点删除该孩子
      if (this.parent.childs[i] === this) {
        this.parent.childs.splice(i, 1);
        break;
      }
    }
    this.parent.render(true, false);
  },
  isFolded: function() {
    if (this.isLeaf()) return false;
    if (this.childs[0] && this.childs[0].selfElement.className === "visible") return false;
    return true;
  },
  isLeaf: function() {
    return this.childs.length === 0;
  },
  toggleFold: function() {
    if (this.isLeaf()) return this;
    for (var i = 0; i < this.childs.length; i++) {
      this.childs[i].render(false, true);
    }
    this.render(true, false);
    return this;
  }
};

//事件绑定
function addEvent(elem, event, handler) {
  if (elem.addEventListeren) {
    elem.addEventListeren(event, handler);
  } else if (elem.attachEvent) {
    elem.attachEvent("on" + event, handler);
  } else {
    elem["on" + event] = handler;
  }
}

var rootNode = document.getElementsByClassName("visible")[0];
var root = new TreeNode({
  parent: null,
  childs: [],
  data: "心理学",
  selfElement: rootNode
});

addEvent(rootNode, "click", function(e) {
  var target = e.target || e.srcElement;
  var domNode = target;
  while (domNode.className.indexOf("visible") === -1) domNode = domNode.parentNode;
  var selectDom = domNode.TreeNode;
  if (target.className.indexOf("menu-title") !== -1 || target.className.indexOf("arrow") !== -1) {
    selectDom.toggleFold();
  }
  if (target.className === "addIcon") {
    selectDom.addChild(prompt("请输入子节点的内容"));
    selectDom.render(true, false);
  }
  if (target.className === "delIcon") {
    selectDom.delChild();
  }
});

root.search = function(query) {
  var resultList = [];
  var queue = [];
  var current = this;
  queue.push(current);
  while (queue.length > 0) {
    current = queue.shift();
    current.render(false, false, false, true);
    if (current.data === query) {
      resultList.push(current);
    }
    for (var i = 0; i < current.childs.length; i++) {
      queue.push(current.childs[i]);
    }
  }
  return resultList;
}

addEvent(document.getElementById("search"), "click", function() {
  if (!String.prototype.trim) {
    String.prototype.trim = function() {
      return this.replace(/^\s+|\s+$/g, "");
    };    
  }
  var value = document.getElementById("input").value.trim();
  if (value === "") {
    document.getElementById("result").innerHTML = "请输入内容！";
    return;
  }
  var resultList = root.search(value);
  if (resultList.length === 0) {
    document.getElementById("result").innerHTML = "没有相关搜索内容";
  } else {
    document.getElementById("result").innerHTML = "查询到" + resultList.length + "个符合条件的结点";
    var pathNode;
    for (var i = 0; i < resultList.length; i++) {
      pathNode = resultList[i];
      pathNode.render(false, false, true, false);
      while (pathNode.parent !== null) {
        if (pathNode.selfElement.className === "hidden") pathNode.parent.toggleFold();
        pathNode = pathNode.parent;
      }
    }
  }
});

//清除搜索结果
addEvent(document.getElementById("clear"), "click", function() {
  document.getElementById("input").value = "";
  Array.prototype.forEach.call(document.getElementsByClassName("highLight"), function(item) {
    item.className = item.className.replace("highLight", "");
  })
  document.getElementById("result").innerHTML = "";
});

root.addChild("认知心理学").addChild("人格心理学").addChild("进化心理学");
root.childs[0].addChild("乌尔里克·奈塞尔").addChild("乔治.米勒").toggleFold();
root.childs[1].addChild("弗洛伊德").addChild("斯金纳").toggleFold();
root.childs[2].addChild("皮亚杰").addChild("班杜拉").toggleFold();
root.childs[1].childs[1].addChild("罗杰斯").addChild("马斯洛").toggleFold();