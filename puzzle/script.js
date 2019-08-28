const table = document.getElementById('table');
const images = ['img1.png', 'img2.png', 'img3.png', 'img4.png', 'img5.png', 'img6.png', 'img7.png', 'img8.png',]; //the locations of the images... 
let w = document.getElementsByTagName('td');

//!---------
// function: shuffle the image array 
// source: https://www.w3resource.com/javascript-exercises/javascript-array-exercise-17.php

function shuffle(_array) {
  let count = _array.length, temp, index;
  // use for loop to repeatly shuffle the array to get a resonable unform distribution...
  for (let i = 1; i < 10; i++) {
    while (count > 0) {
      index = Math.floor(Math.random() * count);
      count--;

      temp = _array[count];
      _array[count] = _array[index];
      _array[index] = temp;
    }
  }
  return _array;
}

// function: placing images inside the game-grid in random order... 
function placeImages(img, tbl) {
  let imgElements = [];
  console.log(w);
  for (let i = 0; i < w.length; i++) {
    imgElements.push(w[i].getElementsByTagName('img')[0]);
  }
  console.log(imgElements);
  // clear grid: 
  for (let _i = 0; _i < imgElements.length; _i++) {
    imgElements[_i].setAttribute('src', ' ');
  }
  // create random order of grid td elements... 
  var grid = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
  console.log(grid);

  // create random order of images ... 
  let imgCopy = (img);
  // place images inside the grid.. 
  var j = 0;
  for (let i = 0; i < grid.length; i += 2) {
    imgElements[grid[i]].setAttribute('src', 'img/' + imgCopy[j] + '');
    imgElements[grid[i + 1]].setAttribute('src', 'img/' + imgCopy[j] + '');
    j++;
  }
  console.log(imgCopy);
}
//place images in the game area... 
placeImages(images, table);

// fit the window height... 
// let body = document.getElementsByTagName('body')[0];

let container=document.getElementById('container');
let gameArea = document.getElementById('gameArea');
container.offsetHeight=document.offsetHeight;
console.log(container +'\n'+ window.outerHeight);
// container.setAttribute('style','height:'+(gameArea.offsetHeight-20)+'px');
container.setAttribute('style','height:'+(window.innerHeight-20)+'px');
window.addEventListener('resize',  function (ev) {
  // target=ev.currentTarget;
  let w0 = window.innerHeight-50;
  if(window.innerWidth>=685){
  let body = document.getElementsByTagName('body')[0];
  let sidebar = document.getElementById('sidebar');
  let gameArea = document.getElementById('gameArea');
  // body.setAttribute('style', 'height:' + w0+';');
  sidebar.setAttribute('style', 'height:' + w0+'px;');
  gameArea.setAttribute('style', 'height:' + w0+'px;');
  }
  else{
    sidebar.setAttribute('style', '');
  gameArea.setAttribute('style', '');
  }
  console.log('target:  '+w0);
});
// let h0=body[0].getAttribute(wi);
// console.log('h0:' + w0);


