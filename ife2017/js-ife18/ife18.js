//移动小方块函数
function MoveSquare() {
  this.deg = 0;
  this.pathIndex = 0;
  this.direct = 'left';
}
MoveSquare.prototype = {
  //横向移动
  rowMove: function(e, direct) {
    if (direct === 'left') {
      if($id('selected').previousElementSibling.textContent !== "") {
        alert('不能再向左了');
        return false;
      }
      $id('selected').parentNode.insertBefore($id('selected'), $id('selected').previousElementSibling);
    } else if (direct === 'right') {
      if(!$id('selected').nextElementSibling) {
        alert('不能再向右了');
        return false;
      }
      $id('selected').parentNode.insertBefore($id('selected').nextSibling.nextElementSibling, $id('selected'));
    }
  },
  //纵向移动
  columnsMove: function(e, direct) {
    var trList = $id('selected').parentNode.getElementsByTagName('td');
    var index = null;
    var targetTr;
    var temp;
    for (var i = 0; i < trList.length; i++) {
      if (trList[i].id === 'selected') {
        index = i;
      }
    }
    if (direct === 'top') {
      if($id('selected').parentNode.previousElementSibling === $id('row1')) {
        alert('不能再向上了');
        return false;
      }
      targetTr = $id('selected').parentNode.previousElementSibling.getElementsByTagName('td')[index];
    } else if (direct === 'bottom') {
      if(!$id('selected').parentNode.nextElementSibling) {
        alert('不能再向下了');
        return false;
      }
      targetTr = $id('selected').parentNode.nextElementSibling.getElementsByTagName('td')[index];
    }
    temp = $id('selected').removeChild($id('selected').firstChild);
    targetTr.appendChild(temp);
    $id('selected').removeAttribute('id');
    targetTr.id = 'selected';
  },
};

function addEvent(elem, event, handler) {
  if (elem.addEventListener) {
    elem.addEventListener(event, handler, false);
  } else if (elem.attachEvent) {
    elem.attachEvent("on" + event, handler);
  } else {
    elem["on" + event] = handler;
  }
}

function $id(id) {
  return document.getElementById(id);
}

var movesquare = new MoveSquare();
var path = ['left', 'top', 'right', 'bottom'];
addEvent($id('control'), 'click', function(e) {
  if (e.target.id === 'toLeft') {
    movesquare.deg -= 90;
    movesquare.direct = path.slice((movesquare.pathIndex -= 1) % 4)[0];
  } else if (e.target.id === 'toRight') {
    movesquare.deg += 90;
    movesquare.direct = path.slice((movesquare.pathIndex += 1) % 4)[0];
  } else if (e.target.id === 'toBack') {
    movesquare.deg += 180;
    movesquare.direct = path.slice((movesquare.pathIndex += 2) % 4)[0];
  }
  if (e.target.id === 'forward') {
    if (movesquare.direct === 'left' || movesquare.direct === 'right') {
      movesquare.rowMove(e, movesquare.direct);
    } else {
      movesquare.columnsMove(e, movesquare.direct);
    }
  }
  $id('selected').style.transform = 'rotate(' + movesquare.deg + 'deg)';
});