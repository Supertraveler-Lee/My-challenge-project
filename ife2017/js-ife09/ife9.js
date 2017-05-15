var queueTag = [], queueHobby = [];
function $ (id) {
  return document.getElementById(id);
}

 function addEventHandler (eles,event,hanlder) {
  if (eles.addEventListener) {
    eles.addEventListener(event,hanlder,false);
  } else if (eles.attachEvene) {
    eles.attachEvent("on" + event,hanlder);
  } else {
    eles["on"+event] = hanlder;
  }
}
addEventHandler($("tag"), "keyup", dealValue);
addEventHandler($("hobby"), "click", dealValue);
addEventHandler($("showTag"), "click", delTag);
addEventHandler($("showTag"), "mouseover", function (e) {
  if (e.target && e.target.parentNode.id === "showTag") {
    e.target.textContent = "删除: "+ e.target.textContent;
    e.target.style.background = "red";
  }
});
addEventHandler($("showTag"),"mouseout",function (e) {
  if (e.target && e.target.parentNode.id === "showTag") {
    e.target.textContent = e.target.textContent.substring(4);
    e.target.style.background = "pink";
  }
})

function delTag (e) {
  if (e.target && e.target.parentNode.id === "showTag") {
    hasDel = e.target.textContent.substring(2);
    queueTag.splice(queueTag.indexOf(hasDel),1);
    $("showTag").innerHTML = '';
    queueTag.forEach(function (e) {
        $("showTag").innerHTML += `<div class="tagList">${e}</div>`;
      });
    }
}

function dealValue (e) {
  value = e.target.value.trim();
  alert(e.target);
  alert(value);
  if (value != null && value.length !== 0) {
    if (e.target === "button") {
      queueHobby = value.split(/[^.。,，;；、\s\n]+/);
      alert(queueHobby);
      showHobby(queueHobby);
    }
    if (e.target === "tag") {
      if (/[.。,，;；、\s\n]+/.test(value)) {
      tagShow(value.slice(0,-1),e);
    }
      if (event.keyCode == 13) {
      tagShow(value);
      }
    }
  }
}

function tagShow (value,e) {
    queueTag.push(value);
    var newqueue = queueTag.filter(function(eles,index,self) {
      return self.indexOf(eles) === index;
    });
    if (newqueue.length === queueTag.length || queueTag.length === 1) {
      e.target.nextSibling.innerHTML = '';
      if (queueTag.length === 11) {
        queueTag.shift();
      } 
    newqueue.forEach(function (eles) {
      e.target.nextSibling.innerHTML += `<div class="tagList">${eles}</div>`;
      });
    } else {
      queueTag.shift();
    }
  e.target.value = '';
}

function showHobby (list) {
  list.forEach(function (eles) {
      $("showHobby").innerHTML += `<div class="hobbyList">${eles}</div>`;
      });
    }
  // queueTag.push(value);
  // var newqueue = queueTag.filter(function(eles,index,self) {
  //   return self.indexOf(eles) === index;
  // });
  // if (newqueue.length === queueTag.length || queueTag.length === 1) {
  //   $("showTag").innerHTML = '';
  //   if (queueTag.length === 11) {
  //     queueTag.shift();
  //   } 
  //   newqueue.forEach(function (e) {
  //       $("showTag").innerHTML += `<div class="tagList">${e}</div>`;
  //     });
  //   } else {
  //     queueTag.shift();
  //   }
  // $("tag").value = '';
  // }

