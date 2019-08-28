const table = document.getElementById('table');
const images = ['img1.png', 'img2.png', 'img3.png', 'img4.png', 'img5.png', 'img6.png', 'img7.png', 'img8.png',]; //the locations of the images... 
let w = document.getElementsByTagName('td');

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
  let imgElements=[];
  console.log(w);
  for(let i=0;i<w.length;i++){
    imgElements.push(w[i].getElementsByTagName('img')[0]);
  }
  console.log(imgElements);
  // clear grid: 
  for (let _i = 0; _i < imgElements.length; _i++) {
    imgElements[_i].setAttribute('src', '');
  }
  // create random order of grid td elements... 
  var grid =shuffle([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
  console.log(grid);

  // create random order of images ... 
  let imgCopy = (img);
  // place images inside the grid.. 
var j=0;
for(let i=0;i<grid.length;i+=2){
  imgElements[grid[i]].setAttribute('src', 'img/'+imgCopy[j]+'');
  imgElements[grid[i+1]].setAttribute('src', 'img/'+imgCopy[j]+'');
  j++;
}
  console.log(imgCopy);
}



placeImages(images, table);