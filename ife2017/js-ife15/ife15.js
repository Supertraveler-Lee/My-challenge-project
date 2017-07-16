$id = function(elem) {
  return document.getElementById(elem);
};
$All = function(elem) {
  return document.querySelectorAll(elem);
};
$span = function(elem) {
  return elem.parentNode.lastElementChild;
};
var input = [{
  isTrue: '名称正确',
  isWrong: '名称格式有误',
  ispassed: false
}, {
  isTrue: '密码符合要求',
  isWrong: '密码格式有误',
  ispassed: false
}, {
  isTrue: '正确',
  isWrong: '两次密码不一致',
  ispassed: false
}, {
  isTrue: '邮箱格式正确',
  isWrong: '邮箱格式有误',
  ispassed: false
}, {
  isTrue: '电话格式正确',
  isWrong: '电话格式有误',
  ispassed: false
}];

function checkValue(value, elem) {
  var judge = [/^[0-9a-zA-Z-_]{4,16}$/.test(value),
    /^\S[0-9a-zA-Z\-_]{6,16}$/.test(value),
    value === $id('input2').value,
    /^[0-9a-z]+([._\\-]*[0-9a-z])*@([0-9a-z]+[-a-z0-9]*[0-9a-z]+\.){1,63}[0-9a-z]+$/.test(value),
    /^[1][0-9]{10}$/.test(value)
  ];
  var index = elem.id.slice(-1)-1;
  console.log(index);
  if (judge[index]) {
    $span(elem).innerHTML = input[index].isTrue;
    $span(elem).style.color = 'gray';
    input[index].ispassed = true;
  } else {
    if (value === "") {
      $span(elem).innerHTML = "不能为空";
    } else {
    $span(elem).innerHTML = input[index].isWrong;
    }
  }
    input[index].ispassed = false;
}

function addEvent(elem,event,handler) {
  if(elem.addEventListener) {
    elem.addEventListener(event,handler);
  } else if(elem.attachEvent){
    elem.attachEvent('on'+event,handler);
  } else {
    elem['on'+event] = handler;
  }
}
[].forEach.call($All('input'), function(elem, index) {
  addEvent(elem,'blur', function(e) {
    $span(elem).style.color = 'red';
    checkValue(this.value, elem);
  });

  addEvent(elem,'focus', function(e) {
    $span(this).style.visibility = 'visible';
  });
});

addEvent($id('submit'),'click',function(e) {
  e.preventDefault();
  var examList = [];
  input.forEach(function(item) {
    examList.push(item.ispassed);
  });
  var success = examList.every(function(item) {
    return item;
  });
  if(success) {
    alert('提交成功');
  } else {
    alert('提交失败');
  }
});