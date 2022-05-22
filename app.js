const wordList = document.querySelector('#word-list');
const textBox = document.querySelector('#text-box')
const addWordBtn = document.querySelector('#submit-btn');
const warningDisplay = document.querySelector('#warning')
const gridBtn = document.querySelector('#grid-btn');
const sideLength = 5;
const maxWordLength = 5;
const gridContainer = document.querySelector('#grid-container');
let words = [];

addWordBtn.addEventListener('click', addWord);
gridBtn.addEventListener('click', createGrid);

//adds word
function addWord() {
    ///getting word from textbox and clears it (makes it lowercase)
    let word = textBox.value.toLowerCase();
    textBox.value = '';
    //creating new list element with text if word is valid and adds it to list of words
    if (validateWord(word)) {
        words.push(word);
        let newWordEl = document.createElement('ul');
        newWordEl.setAttribute('class','word')
        let newWordText = document.createTextNode(word);
        newWordEl.append(newWordText);
        //adding new element to actual list
        wordList.appendChild(newWordEl);
        //adding functionality to delete word
        newWordEl.addEventListener('click', deleteWord);
        newWordEl.addEventListener('mouseover', highlight);
        newWordEl.addEventListener('mouseout', unhighlight);
    }
}

//checks whether word is valid and changes warning display accordingly
function validateWord(word) {
    //makes sure word is not too long
    if (word.length > maxWordLength) {
        warningDisplay.textContent = `Word must contain no more than ${maxWordLength} characters`;
        return false;
    //makes sure word only contains letters
    } else if(!/^[a-zA-Z]+$/.test(word)) {
        warningDisplay.textContent = "Word must only contain letters"
        return false;
    } else if (words.includes(word)) {
        warningDisplay.textContent = "Word already in list"
        return false;
    }
    warningDisplay.textContent = '';
    return true;
}
//deletes word if it is clicked on
function deleteWord() {
    removeFromList(words, this.textContent);
    this.remove();
}
//removes word from list of words
function removeFromList(list, word) {
    for (let i = 0; i < list.length; i++) {
        if (list[i] == word) {
            list.splice(i, 1);
            return;
        }
    }
    return;
}
//highlights word to be deleted
function highlight() {
    this.style.background = 'red';
}
//unhighlights word to be deleted
function unhighlight() {
    this.style.background = 'white';
}
function createGrid() {
    let grid = []
    let row = [];
    //populates grid array with 0's
    for (let i = 0; i < sideLength; i++) {
        for (let j = 0; j < sideLength; j++) {
            row.push('z');
        }
        grid.push(row);
        row = []
    }
    /*
    DEAL WITH INTERSECTIONS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    */
    //orients words into grid
    for (let word of words) {
        //uses rng to generate orientation for word
        let orientation = getRandomInt(1);
        //randomly generates position for word
        let x = getRandomInt(sideLength);
        let y = getRandomInt(sideLength);
        //left-right orientation
        if (orientation == 4) {
            //while word doesn't fit, keep looking for coordinates
            let space = sideLength - x;
            while (word.length > space) {
                x = getRandomInt(sideLength);
                y = getRandomInt(sideLength);
                space = sideLength - x;
            }
            //inserts word into grid left-right (x increments, y doesn't change)
            for (let i = 0; i < word.length; i++) {
                grid[y][x + i] = word.charAt(i);
            }
        //right-left orientation
        } else if (orientation == 3) {
            let space = x + 1;
            //while word doesn't fit, keep looking for coordinates
            while (word.length > space) {
                x = getRandomInt(sideLength);
                y = getRandomInt(sideLength);
                space = x + 1;
            }
            //inserts word into grid right-left (x decrements, y doesn't change)
            for (let i = 0; i < word.length; i++) {
                grid[y][x - i] = word.charAt(i);
            }
        //up-down orientation
        } else if (orientation == 5) {
            let space = sideLength - y;
            //while word doesn't fit, keep looking for coordinates
            while (word.length > space) {
                x = getRandomInt(sideLength);
                y = getRandomInt(sideLength);
                space = sideLength - y;
            }
            //inserts word into grid up-down (x doesn't change, y increments)
            for (let i = 0; i < word.length; i++) {
                grid[y + i][x] = word.charAt(i);
            }
        //down-up orientation
        } else if (orientation == 0) {
            let space = y + 1
            //while word doesn't fit, keep looking for coordinates
            while (word.length > space) {
                x = getRandomInt(sideLength);
                y = getRandomInt(sideLength);
                space = y + 1;
            }
            //inserts word into grid down-up (x doesn't change, y decrements)
            for (let i = 0; i < word.length; i++) {
                grid[y - i][x] = word.charAt(i);
            }
        }
    }




    displayGrid(grid);
}
//displays grid
function displayGrid(grid) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            let letter = document.createElement('p');
            let letterText = document.createTextNode(grid[i][j]);
            letter.setAttribute('class', 'letter');
            letter.append(letterText);
            gridContainer.appendChild(letter); 
        }
        let lineBreak = document.createElement('br');
        gridContainer.appendChild(lineBreak);
    }
}
//chooses random integer from 0 to max exclusive
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}