const table = document.getElementById('table');
const images = ['img1.png', 'img2.png', 'img3.png', 'img4.png', 'img5.png', 'img6.png', 'img7.png', 'img8.png',]; //the locations of the images... 

//!---------
// function: shuffle the image array 
// source: https://www.w3resource.com/javascript-exercises/javascript-array-exercise-17.php

function shuffle(_array) {
  let count = _array.length, temp, index;
  while (count > 0) {
    index = Math.floor(Math.random() * count);
    count--;

    temp = _array[count];
    _array[count] = _array[index];
    _array[index] = temp;
  }
  return _array;
}

// function: placing images inside the game-grid in random order... 
function placeImages(img, tbl) {
  let w = document.getElementsByTagName('td');
  // clear grid: 
  for (let _i = 0; _i < w.length; _i++) {
    w[_i].setAttribute('style', '');
  }
  // create random order of grid td elements... 
  var grid = [];
  for (let i = 0; i < w.length; i++) {
    grid[i] = i;
  }
  shuffle(grid);
  // console.log(grid);

  // create random order of images ... 
  let imgCopy = shuffle(img);
  // place images inside the grid.. 
var j=0;
for(let i=0;i<grid.length;i+=2){
  w[grid[i]].setAttribute('style', 'background-image:url(img/'+imgCopy[j]+');');
  w[grid[i+1]].setAttribute('style', 'background-image:url(img/'+imgCopy[j]+');');
  j++;
}
  console.log(imgCopy);
}



placeImages(images, table);