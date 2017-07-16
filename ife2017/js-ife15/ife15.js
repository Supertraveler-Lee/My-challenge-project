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
  isWrong: '名称格式有误'
}, {
  isTrue: '密码符合要求',
  isWrong: '密码格式有误'
}, {
  isTrue: '正确',
  isWrong: '两次密码不一致'
}, {
  isTrue: '邮箱格式正确',
  isWrong: '邮箱格式有误'
}, {
  isTrue: '电话格式正确',
  isWrong: '电话格式有误'
}];

function checkValue(value, elem) {
  var judge = [/^[0-9a-zA-Z-_]{4,16}$/.test(value),
    /^\S[0-9a-zA-Z\-_]{6,16}$/.test(value),
    $span(elem).value === value,
    /^[0-9a-z]+([._\\-]*[0-9a-z])*@([0-9a-z]+[-a-z0-9]*[0-9a-z]+\.){1,63}[0-9a-z]+$/.test(value),
    /^[1][0-9]{10}$/.test(value)
  ];
  var index = elem.id.slice(-1)-1;
  if (judge[index]) {
    $span(elem).innerHTML = input[index].isTrue;
    $span(elem).style.color = 'gray';
  } else {
    if (value === "") {
      $span(elem).innerHTML = "不能为空";
    } else {

    $span(elem).innerHTML = input[index].isWrong;
    }
  }
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