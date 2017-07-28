function MoveSquare() {
    this.deg = 0;
    this.pathIndex = 0;
    this.direct = 'left';
}
MoveSquare.prototype = {
    rowMove: function(e,direct) {
        if(direct === 'left') {
        e.target.insertBefore(e.target.parentNode,e.target.previousSibling);
        } else if(direct === 'right') {
        e.target.insertBefore(e.target.parentNode,e.target.nextSibling);
        }
    },
    columnsMove: function(e,direct) {
        e.target.removeAttribute('id');
        var temp = e.target.removeChild(e.target.firstChild);
        var trList = e.target.parentNode.getElementByTagname('tr');
        var index = null;
        var targetTr;
        for(var i=0;i<trList.length;i++) {
            if(trList[i].id === 'selected') {
                index = i;
            }
        }
        if(direct === 'top') {
        targetTr = e.target.parentNode.previousSibling.getElementByTagname('tr')[index];
        } else if(direct === 'bottom') {
        targetTr = e.target.parentNode.nextSibling.getElementByTagname('tr')[index];
        }
        targetTr.innerHTML = temp;
        targetTr.id = 'selected';
    }
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
 var path = ['left','top','right','bottom'];
 addEvent($id('control'), 'click', function(e) {
    if(e.target.id === 'toLeft') {
        movesquare.deg-=90;
        movesquare.direct = path.slice((movesquare.pathIndex-=1)%4)[0];
    } else if(e.target.id === 'toRight') {
        movesquare.deg+= 90;
        movesquare.direct = path.slice((movesquare.pathIndex+=1)%4)[0];
    } else if (e.target.id === 'toBack'){
        movesquare.deg+= 180;
        movesquare.direct = path.slice((movesquare.pathIndex+=2)%4)[0];
    }
    $id('selected').style.transform = 'rotate(' + movesquare.deg + 'deg)';
    console.log(movesquare.direct,movesquare.pathIndex);
    if(e.target.id === 'forward') {
        if(movesquare.direct === 'left') {

        }
    }
 });