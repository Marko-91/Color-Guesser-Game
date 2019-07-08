//Get event listeners

const cube = document.querySelectorAll('.cube');
const newColors = document.getElementById('new-colors');
const red = document.getElementById('red');
const green = document.getElementById('green');
const blue = document.getElementById('blue');
const navbar = document.getElementById('nav');
const middle = document.getElementById('play-again');
const easy = document.getElementById('easy');
const hard = document.getElementById('hard');

//Load Game

function load(num) {

    let redColor = random();
    red.textContent = redColor;
    let greenColor = random();
    green.textContent = greenColor;
    let blueColor = random();
    blue.textContent = blueColor;

    // Loop tru the cube divs and check if the random num matches the iterator
    for (let i = 0; i < cube.length; i++) {

        //reset the values
        cube[i].style.opacity = '1';
        cube[i].style.visibility = 'visible';
        middle.innerHTML = '';
        middle.classList = 'col-sm';
        navbar.style.background = '#88a39e';
        newColors.innerHTML = 'New Game';

        if (i === num) {
            // If it does, then set it to a cerain div
            cube[i].style.background = `rgb(${redColor}, ${greenColor}, ${blueColor})`;
            // If not, randomize it
        } else {
            cube[i].style.background = `rgb(${random()}, ${random()}, ${random()})`;
        }
        // Check to see if the bacground of the clicked div matches the randomized H1
        cube[i].addEventListener('click', () => {
            if (cube[i].style.background === `rgb(${redColor}, ${greenColor}, ${blueColor})`) {
                let arr = getSiblings(cube[i]);
                let j = 0;
                while (j < arr.length) {
                    //Remove all the siblings if it matches, game over
                    arr[j].style.background = `rgb(${redColor}, ${greenColor}, ${blueColor})`;
                    nav.style.background = `rgb(${redColor}, ${greenColor}, ${blueColor})`;
                    arr[j].style.transition = 'all 1s';
                    j++;
                    middle.classList = 'p-3 bold col-sm text-success text-center';
                    middle.innerHTML = 'Correct!';
                };
                cube[i].style.opacity = '1';
                cube[i].style.visibility = 'visible';
                newColors.innerHTML = 'Try again?';
            } else {
                // Fade away the wrong answer
                cube[i].style.transition = 'all 0.5s';
                cube[i].style.opacity = '0';
                cube[i].style.visibility = 'hidden';
                middle.classList = 'p-3 bold col-sm text-danger text-center';
                middle.innerHTML = 'Incorrect!';
            }
        })
    }

}


//random function 1-255

function random() {
    return Math.floor(Math.random() * 255 + 1);
}

//random 0-5 ! beacuse arrays are 0 based ! ... took me a while do fix that little bug...

function randomSquares1() {
    return Math.floor((Math.random() * 6 + 1)) - 1;
}

//random 0-2

function randomSquares2() {
    return Math.floor((Math.random() * 3 + 1)) - 1;
}

//GET SIBLINGS FUNCTION
var getSiblings = function (elem) {

    // Setup siblings array and get the first sibling
    var siblings = [];
    var sibling = elem.parentNode.firstChild;

    // Loop through each sibling and push to the array
    while (sibling) {
        if (sibling.nodeType === 1 && sibling !== elem) {
            siblings.push(sibling);
        }
        sibling = sibling.nextSibling
    }

    return siblings;

};

//Load games UI
newColors.addEventListener('click', () => {
    if (easy.classList.contains('state')) {
        for (let i = 0; i < cube.length; i++) {
            if (i < 3) {
                load(randomSquares2());
                newColors.innerHTML = 'Reset Colors';
            } else {
                cube[i].style.opacity = '0';
                cube[i].style.visibility = 'none';
            }
        }
    } else {
        load(randomSquares1());
        newColors.innerHTML = 'Reset Colors';
    }

});

easy.addEventListener('click', () => {
    easy.classList = 'p-3 bold col-sm state';
    hard.classList = 'p-3 bold col-sm click';

    for (let i = 0; i < cube.length; i++) {
        if (i < 3) {

            load(randomSquares2());
            newColors.innerHTML = 'Reset Colors';
        } else {
            cube[i].style.opacity = '0';
            cube[i].style.visibility = 'none';
        }
    }

});

hard.addEventListener('click', () => {
    easy.classList = 'p-3 bold col-sm click';
    hard.classList = 'p-3 bold col-sm state';
    load(randomSquares1());
    newColors.innerHTML = 'Reset Colors';
});