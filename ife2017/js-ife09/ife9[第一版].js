var queueTag = [],
    queueHobby = [];

function $(id) {
  return document.getElementById(id);
}

function strTrim(str) {
  if (typeof String.prototype.trim != "function") {
    String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g,"");
    };
  }
   return str.trim();
}

function addEventHandler(eles, event, hanlder) {
  if (eles.addEventListener) {
    eles.addEventListener(event, hanlder, false);
  } else if (eles.attachEvene) {
    eles.attachEvent("on" + event, hanlder);
  } else {
    eles["on" + event] = hanlder;
  }
}
addEventHandler($("tag"), "keyup", handlerTag);
addEventHandler($("hobby"), "click", handlerHobby);
addEventHandler($("showTag"), "click", delTag);
addEventHandler($("showTag"), "mouseover", function(e) {
  if (e.target && e.target.parentNode.id === "showTag") {
    e.target.textContent = "删除: " + e.target.textContent;
    e.target.style.background = "red";
  }
});
addEventHandler($("showTag"), "mouseout", function(e) {
  if (e.target && e.target.parentNode.id === "showTag") {
    e.target.textContent = e.target.textContent.substring(4);
    e.target.style.background = "pink";
  }
})

function delTag(e) {
  if (e.target && e.target.parentNode.id === "showTag") {
    hasDel = e.target.textContent.substring(2);
    queueTag.splice(queueTag.indexOf(hasDel), 1);
    $("showTag").innerHTML = '';
    queueTag.forEach(function(e) {
      $("showTag").innerHTML += `<div class="tagList">${e}</div>`;
    });
  }
}

function handlerTag(e) {
  value = strTrim(e.target.value);
  if (value != null && value.length !== 0) {
    if (/[.。,，;；、\s\n]+/.test(value)) {
      tagShow(value.slice(0, -1));
    }
    if (event.keyCode == 13) {
      tagShow(value);
    }
  }
}

function tagShow(value) {
  queueTag.push(value);
  var newqueue = queueTag.filter(function(eles, index, self) {
    return self.indexOf(eles) === index;
  });
  if (newqueue.length === queueTag.length || queueTag.length === 1) {
    $("showTag").innerHTML = '';
    if (queueTag.length === 11) {
      queueTag.shift();
    }
    newqueue.forEach(function(e) {
      $("showTag").innerHTML += `<div class="tagList">${e}</div>`;
    });
  } else {
    queueTag.shift();
  }
  $("tag").value = '';
}

function handlerHobby() {
  value = strTrim($("textarea").value);

  if (value.length !== 0 && value != null) {
    queueHobby = value.split(/[.。,，;；、\s\n]+/)
      .filter(function(item) {
        return item.length !== 0;
      });
    showHobby(queueHobby);
  }
}

function showHobby(list) {
  $("showHobby").innerHTML = '';
  list.forEach(function(eles) {
    $("showHobby").innerHTML += `<div class="hobbyList">${eles}</div>`;
  });
  $("textarea").value = '';
}
