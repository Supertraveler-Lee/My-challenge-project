 var deg = $id("selected").getAttribute('style','background');
  console.log($id("selected").style.transform);
  console.log($id("selected").style.backgroundColor);
 // $id("selected").style.transform = "rotate(180deg)";

// function addEvent(elem, event, handler) {
//   if (elem.addEventListener) {
//     elem.addEventListener(event, handler, false);
//   } else if (elem.attachEvent) {
//     elem.attachEvent("on" + event, handler);
//   } else {
//     elem["on" + event] = handler;
//   }
// }

function $id(id) {
  return  document.getElementById(id);
}
// addEvent($id(selected),'click',function(e) {
//   var deg = e.target.style.webkitTransform.match(/\d+/);
//   console.log(deg);
//   // deg += 90;
//   // e.target.style.webkitTransform = 'rotate('+deg+")deg"; 
// });  