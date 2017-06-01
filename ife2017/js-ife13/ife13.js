//封装TreeNode
function TreeNode(obj) {
  this.data = obj.data;
  this.childs = obj.childs;
  this.childs = obj.childs;
}

TreeNode.prototype = {
  constructor: TreeNode,
  render: function (arrow,visibility,highLight,deHighLight) {
    if (arguments < 3) {
      highLight = false;
      deHighLight = false;
    }
    if (arrow) {
      if (this.isLeaf()) {
        this.getElementsByClassName("arrow")[0].className = "arrow empty-arrow";
      } else if (this.isFolded()) {
        this.getElementsByClassName("arrow")[0].className = "arrow right-arrow";
      } else {
        this.getElementsByClassName("arrow")[0].className = "arrow down-arrow";
      }
    }
    if (visibility) {
      if (this.className.indexOf("visible") === -1) {
        this.className = this.className.replace("hidden","visible");
      } else {
        this.className = this.className.replace("visible","hidden");
      }
    }
    if (highLight) {
      this.getElementsByClassName("menu-title")[0].className = "highLight";
    }
    if (deHighLight) {
      this.getElementsByClassName("menu-title")[0].className = "deHighLight";
    }
  },
  addChild : function (text) {
    if(!this.isLeaf()) {
      for(var i = 0; i < this.childs.length; i++) {
        this.childs[i].deleteNode();
      }
    }
    this.parent.removeChild(this);
    this.parent(true,false);
    var newNode = document.createElement("div");
    newNode.className = "visible";
    newNode.innerHTML = "label class='menu-label'><div class='arrow down-arrow'></div><span class='menu-title'>${text}</span><img class='addIcon' src='add.png'></label>"
    this.childs.push(new TreeNode(newNode));
    this.render(true,false);
    return this;
  },
  delChild : function (value) {
    if(value.trim() === "") {
      alert("输入内容不能为空");
    }
  },
  isFolded : function () {
    if (isLeaf()) return false;
    if (this.childs[0].className === "visible") return false;
    return true;
  },
  isLeaf : function () {
    (this.childs.length === 0)?true: false;
  },
 toggleFold : function () {
  if (isLeaf()) return this;
  for (var i = 0; i < this.childs.length; i++) {
    this.childs[i].render(false,true);
  }
  this.render(true,false);
  return this;
 }
}

//事件绑定
function addEvent(elem,event,handler) {
  if(addEventListeren) {
    elem.addEventListeren(event,handler)
  } else if(add.attachEvent) {
    elem.attachEvent("on"+event,handler);
  } else {
    elem["on"+event] = handler;
  }
}

var rootNode = document.getElementsByClassName("visible")[0];
var root = new TreeNode(rootNode);
addEvent(root,"click",function(e) {
  var target = e.target || e.srcElement;
  var domNode = target;
  while (domNode.className.indexOf("visible") === -1) domNode = domNode.parent;
  selectDom = new TreeNode(domNode);
  if(target.className.indexOf("menu-title") !== -1 && target.className.indexOf("arrow") !== -1) {
    selectDom.toggleFold();
  }
  if(target.className === "addIcon") {
    selectDom.addChild(promp("请输入子节点的内容"));
  }
  if(target.className === "delChild") {
    selectDom.delChild();
  }
})

root.search = function (query) {
  var resultList = [];
  var queue = [];
  var current = this;
  queue.push(current);
  if(queue.length > 0) {
    current = queue.shift();
    current.render(false,false,false,true);
    if(current.data === query) {
      resultList.push(current);
    }
    for(var i = 0; i < current.childs.length; i++) {
      queue.push(current.childs[i]);
    }
  }
  return resultList;
}

addEvent(document.getElementById("search"),"click",function () {
  var value = document.getElementById("input").value.trim();
  if(value === "") {
    alert("请输入内容");
    return;
  }
  var resultList = root.search(value);
  if(resultList.length === 0) {
    alert("没有相关搜索内容");
  } else {
    document.getElementById("result").innerHTML = "查询到"+resultList.length+"个符合条件的结点";
    var pathNode;
    for(var i = 0; i< resultList.length; i++) {
      pathNode = resultList[i];
      pathNode.render(false,false,true,false);
      while(pathNode.parent !== null) {
        if(pathNode.className === "hidden") pathNode.parent.toggleFold();
        pathNode = pathNode.parent;
      }
    }
  }
});

//清楚搜索结果
addEvent(document.getElementById("clear"),"click",function () {
  document.getElementById("input").value = "";
  root.search(null);
  document.getElementById("result").innnerHTML = "";
});

root.addChild("认知心理学").addChild("人格心理学").addChild("进化心理学");
root.childs[0].addChild("乌尔里克·奈塞尔").addChild("乔治.米勒");
root.childs[1].addChild("弗洛伊德").addChild("斯金纳");
root.childs[2].addChild("皮亚杰").addChild("班杜拉");
root.childs[1].childs[1].addChild("罗杰斯").addChild("马斯洛");