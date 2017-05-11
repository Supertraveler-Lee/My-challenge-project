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

addEventHandler($("tag"),"keyup",dealValue);

function dealValue () {
  newTag = $("tag").value.trim();
  if (newTag != null && newTag.length !== 0) {
    if (/[.。,，;；、\s\n]+/.test(newTag)|| event.keyCode == 13) {
      tagShow(newTag);
    }
  }
 }

function tagShow (value) {
  var temp = queueTag; 
  queueTag.push(value);
  var newqueue = queueTag.filter(function(eles,index,self) {
    return self.indexOf(eles) === index;
  });
  if (newqueue.length !== queueTag.length) {
    if (queueTag.length === 10) {
      newqueue.shift();
    } 
    newqueue.forEach(function (e) {
        $("showTag").innerHTML += `<div class="tagList">${e}</div>`;
      });
    }
  }
