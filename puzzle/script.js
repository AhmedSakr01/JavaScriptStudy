const table = document.getElementsByTagName('table');
console.log('Table: \n' + table);
const images = ['img1.png', 'img2.png', 'img3.png', 'img4.png', 'img5.png', 'img6.png', 'img7.png', 'img8.png',]; //the locations of the images... 
let w = document.getElementsByTagName('td');
// Set the ID tag of all <td> ... to be used in the GAME LOGIC section...
for (let r = 0; r < w.length; r++) {
  w[r].setAttribute('id', r);
}
console.log(`Table data elements: ${w.length}`);

let order = [];

//!---------
// function: shuffle the image array 
// source: https://www.w3resource.com/javascript-exercises/javascript-array-exercise-17.php

function shuffle(_array) {
  let count = _array.length, temp, index;
  // use for loop to repeatly shuffle the array to get a resonable unform distribution...
  for (let i = 1; i < 100; i++) {
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

function placeImages(img) {
  // function: placing images inside the game-grid in random order... 
  var imgElements = [];
  for (let i = 0; i < w.length; i++) {
    imgElements.push(w[i].getElementsByTagName('img')[0]);
  }
  // console.log(imgElements);
  // clear grid: 
  for (let _i = 0; _i < imgElements.length; _i++) {
    imgElements[_i].setAttribute('src', ' ');
  }
  // create random order of grid td elements... 
  order = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
  let imgCopy = (img);
  // place images inside the grid.. 
  var j = 0;
  for (let i = 0; i < order.length; i += 2) {
    imgElements[order[i]].setAttribute('src', 'img/' + imgCopy[j] + '');
    imgElements[order[i + 1]].setAttribute('src', 'img/' + imgCopy[j] + '');
    j++;
  }
  // console.log(imgCopy);
}
//place images in the game area... 
placeImages(images);

// fit the window height... 
// let body = document.getElementsByTagName('body')[0];

let container = document.getElementById('container');
let gameArea = document.getElementById('gameArea');
container.offsetHeight = document.offsetHeight;
console.log(container + '\n' + window.outerHeight);
// container.setAttribute('style','height:'+(gameArea.offsetHeight-20)+'px');
container.setAttribute('style', 'height:' + (window.innerHeight - 20) + 'px');
// 
// ----------GAME--LOGIC-----------//
// order[] holds the order of images inside the game, each pair of sequencial elements holds the same image..

/*****************************************************************************************************************************
 * when element is clicked  --> add .clicked to its style...
 *                          --> search order[i] for its index and save it in variable <i> -->
 *                                    --> get the matching element =? if i is even --> the match is i+1 the next element
 *                                                                  =? if i is odd --> the match is i-1 the previous.
 *                          --> set the firstClick flag to true...
 * when two elements are clicked -->
 *                          --> store the second element's order in <i2> --> compare it to the match from the previous step.
 *      --? if they are the same --> change their style into .correct
 *                               --> change the logo to a happy face :)
 *      --? else  --> change the style to incorrect 
 *                --> after 500 ms --> reset their style to .invisible
 * 
 ****************************************************************************************************************************/
// -- Remember : variable - w[0] is the array of table data elements <td> tags selected in the beginning...
// --            variable - table is the table that contains all the images...
let Clicked = false;
var firstIndex;
var nextindex;
var score = 0;
// console.log(table);
var firstItem;
var tableClickHandler = function tableClickEvtL(e) {
  let evTarget = e.target;
  console.log('event target: ' + evTarget);
  if (e.target.nodeName == 'TD') {
    // console.log(e.target);
    show(evTarget);
    if (!Clicked) {
      console.log('clicked');
      firstItem = evTarget;
      firstIndex = evTarget.getAttribute('id');     // gets the index of the clickes <td>
      evTarget.setAttribute('class', 'clicked');
      // ----> change the logo to the thinking mode here!
      let orderIndex = order.indexOf(Number(firstIndex)); // gets the order of the clickes <td> in the shuffle order array.
      if (orderIndex % 2 == 0) {
        nextindex = order[orderIndex + 1];
      }
      else {
        nextindex = order[orderIndex - 1];
      }
      console.log(nextindex);
      Clicked = true;
    }
    else {
      let newClick = Number(evTarget.getAttribute('id'));
      if (newClick == nextindex) {
        console.log("Yay ! You got that right man!");
        evTarget.setAttribute('class', '');
        evTarget.setAttribute('class', 'correct');
        firstItem.setAttribute('class', '');
        firstItem.setAttribute('class', 'correct');
        scoreUp();
      }
      else {
        console.log("Sorry man, Try again!");
        // evTarget.setAttribute('class', 'visible');
        // firstItem.setAttribute('class', 'visible');
        incorrect(evTarget, firstItem);
      }

      Clicked = false;
    }


  }

}
var tableEvent = table[0].addEventListener('click', tableClickHandler);

// Make thr image visible after click ...
function show(td) {
  let temp = td.getElementsByTagName('img')[0];
  temp.setAttribute('class', 'visible');
}
function scoreUp() {
  score++;
  let scoreElm = document.getElementById('score');
  scoreElm.innerHTML = "Score: " + score;
}
function incorrect(index_1, index_2) {
  //reset <td> styling...
  index_1.setAttribute('class', '');
  index_2.setAttribute('class', '');
  //reset inner <img> element style...
  index_1.getElementsByTagName('img')[0].setAttribute('class', '');
  index_2.getElementsByTagName('img')[0].setAttribute('class', '');
  index_1.getElementsByTagName('img')[0].setAttribute('class', 'hidden');
  index_2.getElementsByTagName('img')[0].setAttribute('class', 'hidden');
}
/*****************************************************************************************************************************
*-----------TIMER---------
* When you click [start] --> the timer start ticking...
*                         ---> <timer> element counts down from 2 min t0 zero-->  
*                         ---------> when time is less than 30 secound --> font color turns red...
                          ---------------> when it reaches 10 sec ---> font color alternate between red and white...
                          --------------------> when it reaches zero, a "good luck" message appears, timer stops, [start] button turns to [restart].
 * 
 */
var start = false;
const startBtn = document.getElementById('start');
const timer = document.getElementById('timer');
//---- Here starts the fun ! :D -------------->>>
startBtn.addEventListener('click', function (e) {
  let t_min = 2, t_sec = 0;
  startBtn.setAttribute('style', 'pointer-events:none;'); //   Disables the button until time out or reload...
  var countDownTimer = setInterval(function () {
    if (t_sec <= 0.1 & t_min > 0) {
      t_min--;
      t_sec = 60 - 0.1;
    }
    else if (t_sec <= 0.1 & t_min <= 0) {
      //Time Out .....................>>>>>>>>>>>><<<<<<<<<<<<<
      table[0].removeEventListener('click',tableClickHandler);

      clearInterval(countDownTimer);

    }
    t_sec -= 0.1;
    timer.innerHTML = `${t_min}:${Number(t_sec).toFixed(2)}`;
  }, 100);
});

function timerText() {
  document
}
