// Select color input
// Select size input

// When size is submitted by the user, call makeGrid()
var width = 0, height = 0;
const Table = document.getElementById('pixelCanvas');
var sizeForm = document.getElementById('sizePicker');
//Set the color 
// event listener to change the color when the user pick another one...
var Color = document.getElementById('colorPicker').value;
document.getElementById('colorPicker').addEventListener('change', function (ev) {
  Color = document.getElementById('colorPicker').value;
  console.log(Color);
});
// Grid table size change on form.submit...
sizeForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  height = sizeForm.elements["height"].value;
  width = sizeForm.elements["width"].value;
  // console.log(width);
  // console.log(height);
  makeGrid(height,width);
  console.log(Color);
});
// makeGrid creates the grid as table of h rows × w columns...
function makeGrid(h,w) {
  // Your code goes here!
  // Select the table element...
  // Clear the Table before creating a new one with the given height and width...
  if (Table.childElementCount > 0) {
    Table.innerHTML = null;
  }

  let rows = '';
  for (let i = 1; i <= h; i++) {
    rows = document.createElement('tr');
    for (let j = 1; j <= w; j++) {
      let columns = document.createElement('td');
      rows.appendChild(columns);
    }
    Table.appendChild(rows);
  }

}
// This Event listener will draw the table element when user click on any of them!
Table.addEventListener('click',function(evt){
  if(evt.target.nodeName=='TD'){
console.log(evt.target.setAttribute('style','background-color:'+Color));
}});

document.addEventListener('DOMContentLoader',  makeGrid(10,10),true);
document.addEventListener('DOMContentLoader',  alert("Welcome!\nChoose the grid size and start drawing!"),false);
 