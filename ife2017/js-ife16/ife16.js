var addEvent = function(elem,event,handler) {
  if(elem.addEventListener) {
    elem.addEventListener(event,handler);
  } else if(elem.attachEvent) {
    elem.attachEvent("on"+event,handler);
  } else {
    elem["on"+event] = handler;
  }
};

var element = {
  getId : function(elem) {
            return document.getElementById(elem);
          },
  display : function(elem,boolean=true) {
    displayValue = boolean  ? 'block' : 'none';
    console.log(displayValue);
    element.getId(elem).style.display = displayValue; 
  }
};
function getShool(index) {
  var school = [['柏拉图学院','雅典学院','伊壁鸠鲁学院','吕克昂哲学学院'],
      ['剑桥大学','牛津大学','帝国理工大学','圣安德鲁斯大学'],
      ['麻省理工学院','哈佛大学','普林斯顿大学','斯坦福大学'],
      ['澳洲国立大学','墨尔本大学','新南威尔士大学','悉尼大学']];
  element.getId('school').innerHTML = '';
  school[index].forEach(function(item) {
    element.getId('school').innerHTML += `<option>${item}</option>`;
  });
}

addEvent(element.getId('student'),'click',function(e) {
  if(e.target.value === '在校生') {
    element.display('graduate') ;
    element.display('ungraduate',false);
    getShool(0);
  } else {
    element.display('ungraduate') ;
    element.display('graduate',false);
  }
});

addEvent(element.getId('city'),'click',function(e) {
  getShool(e.target.selectedIndex);
});