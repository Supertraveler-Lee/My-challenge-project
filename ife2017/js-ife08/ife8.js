function $ (id) {
  return document.getElementById(id);
}
var data = [];

function render (value) {
    $("show").innerHTML = "";
    data.forEach(function (item) {
      if(value != null && value.length !== 0) {
        item = item.replace(new RegExp(value,"g"),`<span id="selected">${value}</span>`);
      } 
      $("show").innerHTML += `<div id="items">${item}</div>`;
  });
    $("textarea").value = "";
}
  

$("insert").onclick = function() {
  var str = $("textarea").value.trim();
  data = str.split(/[^0-9a-z-A-Z\u4e00-\u9fa5]+/)
            .filter(function (item) {
               return (item.length !== 0);
            });
  render();
};
$("search").onclick = function() {
  var searchValue = $("searchInput").value.trim();
  render(searchValue);
};
