const wordList = document.querySelector('#word-list');
const textBox = document.querySelector('#text-box')
const addWordBtn = document.querySelector('#submit-btn');
const warningDisplay = document.querySelector('#warning')
const gridBtn = document.querySelector('#grid-btn');
const sideLength = 15;
const maxWordLength = 8;
const placeHolder = '#';
const maxOrientations = 8;
const gridContainer = document.querySelector('#grid-container');
let words = [];
const bgColor = '#564256';
const hlColor = '#8b0000';
const correctColor = '#96939B';
const instructions = document.querySelector('#instructions');
const gridRestartText = document.querySelector('#grid-restart-text')

//adds word if button to add is clicked or enter button is clicked
addWordBtn.addEventListener('click', addWord);
document.addEventListener('keypress', (event) => {
    if (event.keyCode == 13) {
        addWord();
    }
})
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
    if (word.length == 0) {
        warningDisplay.textContent = "Enter a word first"
        return false;
    }
    else if (word.length > maxWordLength) {
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
    this.style.background = hlColor;
}
//unhighlights word to be deleted
function unhighlight() {
    this.style.background = bgColor;
}
function createGrid() {
    let grid = []
    let row = [];
    //populates grid array with 0's
    for (let i = 0; i < sideLength; i++) {
        for (let j = 0; j < sideLength; j++) {
            row.push(placeHolder);
        }
        grid.push(row);
        row = []
    }
    //orients words into grid
    for (let word of words) {
        let fits = false;
        let orientation;
        let x;
        let y;
        let spaceX;
        let spaceY;
        let actualLetter;
        let anticipatedLetter;
        //while word can't fit, look for orientation and position that allows it to fit
        while (fits == false) {
            //chooses random orientation, xcoor, and y coor
            orientation = getRandomInt(maxOrientations);
            x = getRandomInt(sideLength);
            y = getRandomInt(sideLength);
            //checks if fits for diff orientations
            //right
            if (orientation == 0) {
                spaceX = sideLength - x;
                //if it fits
                if (word.length <= spaceX) {
                    //prevents loop from running again for this word
                    fits = true;
                    //checks if the space is populated
                    for (let i = 0; i < word.length; i++) {
                        actualLetter = grid[y][x+i];
                        anticipatedLetter = word[i];
                        if (actualLetter != '#' && actualLetter != anticipatedLetter) {
                            fits = false;
                            break;
                        }
                    }
                    //puts word into 2d array if there's space
                    if (fits == true) {
                        for (let i = 0; i < word.length; i++) {
                            grid[y][x+i] = word.charAt(i);
                        }
                    }
                }
            //down
            } else if (orientation == 1) {
                spaceY = sideLength - y;
                if (word.length <= spaceY) {
                    //prevents loops from running again for this word
                    fits = true;
                    //checks if space is populated
                    for (let i = 0; i < word.length; i++) {
                        actualLetter = grid[y+i][x];
                        anticipatedLetter = word.charAt(i);
                        if (actualLetter != '#' && actualLetter != anticipatedLetter) {
                            fits = false;
                            break;
                        }
                    }
                    if (fits == true) {
                        for (let i = 0; i < word.length; i++) {
                            grid[y+i][x] = word.charAt(i);
                        }
                    }
                }
            //left
            } else if (orientation == 2) {
                spaceX = x + 1;
                if (word.length <= spaceX) {
                    fits = true;
                    for (let i = 0; i < word.length; i++) {
                        actualLetter = grid[y][x-i];
                        anticipatedLetter = word.charAt(i);
                        if (actualLetter != '#' && actualLetter != anticipatedLetter) {
                            fits = false;
                            break;
                        }
                    }
                    if (fits == true) {
                        for (let i = 0; i < word.length; i++) {
                            grid[y][x-i] = word.charAt(i);
                        }
                    }
                }
            //up
            } else if (orientation == 3) {
                spaceY = y + 1;
                if (word.length <= spaceY) {
                    fits = true;
                    for (let i = 0; i < word.length; i++) {
                        actualLetter = grid[y-i][x];
                        anticipatedLetter = word.charAt(i);
                        if (actualLetter != '#' && actualLetter != anticipatedLetter) {
                            fits = false;
                            break;
                        }
                    }
                    if (fits == true) {
                        for (let i = 0; i < word.length; i++) {
                            grid[y-i][x] = word.charAt(i);
                        }
                    }
                }
            //bottom right
            } else if (orientation == 4) {
                spaceX = sideLength - x;
                spaceY = sideLength - y;
                if (word.length <= spaceX && word.length <= spaceY) {
                    fits = true;
                    for (let i = 0; i < word.length; i++) {
                        actualLetter = grid[y+i][x+i];
                        anticipatedLetter = word.charAt(i);
                        if (actualLetter != '#' && actualLetter != anticipatedLetter) {
                            fits = false;
                            break;
                        }
                    }
                    if (fits == true) {
                        for (let i = 0; i < word.length; i++) {
                            grid[y+i][x+i] = word.charAt(i);
                        }
                    }
                }
            //top right
            } else if (orientation == 5) {
                spaceX = sideLength - x;
                spaceY = y + 1;
                if (word.length <= spaceX && word.length <= spaceY) {
                    fits = true;
                    for (let i = 0; i < word.length; i++) {
                        actualLetter = grid[y-i][x+i];
                        anticipatedLetter = word.charAt(i);
                        if (actualLetter != '#' && actualLetter != anticipatedLetter) {
                            fits = false;
                            break;
                        }
                    }
                    if (fits == true) {
                        for (let i = 0; i < word.length; i++) {
                            grid[y-i][x+i] = word.charAt(i);
                        }
                    }

                }
            //bottom left
            } else if (orientation == 6) {
                spaceX = x + 1;
                spaceY = sideLength - y;
                if (word.length <= spaceX && word.length <= spaceY) {
                    fits = true;
                    for (let i = 0; i < word.length; i++) {
                        actualLetter = grid[y+i][x-i];
                        anticipatedLetter = word.charAt(i);
                        if (actualLetter != '#' && actualLetter != anticipatedLetter) {
                            fits = false;
                            break;
                        }
                    }
                    if (fits == true) {
                        for (let i = 0; i < word.length; i++) {
                            grid[y+i][x-i] = word.charAt(i);
                        }
                    }
                }
            //top left
            } else if (orientation == 7) {
                spaceX = x + 1;
                spaceY = y + 1;
                if (word.length <= spaceX && word.length <= spaceY) {
                    fits = true;
                    for (let i = 0; i < word.length; i++) {
                        actualLetter = grid[y-i][x-i];
                        anticipatedLetter = word.charAt(i);
                        if (actualLetter != '#' && actualLetter != anticipatedLetter) {
                            fits = false;
                            break;
                        }
                    }
                    if (fits == true) {
                        for (let i = 0; i < word.length; i++) {
                            grid[y-i][x-i] = word.charAt(i);
                        }
                    }
                }
            }
        }
    }
    displayGrid(grid);
}
//displays grid and makes game playable
function displayGrid(grid) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            let letter = document.createElement('p');
            let text = grid[i][j];
            if (isLetter(text)) {
                let letterText = document.createTextNode(text);
                letter.setAttribute('class', 'letter');
                letter.append(letterText);
                //letter.style.backgroundColor = 'beige'; //for testing
                //turns correct color if it's clicked
                letter.addEventListener('click', (e) => {
                    e.target.style.backgroundColor = correctColor;
                })
                gridContainer.appendChild(letter); 
            } else {
                let letterText = document.createTextNode(generateLetter());
                letter.setAttribute('class','letter');
                letter.append(letterText);
                gridContainer.appendChild(letter);
            }
        }
        let lineBreak = document.createElement('br');
        gridContainer.appendChild(lineBreak);
    }
    //changes instructions and button text
    instructions.textContent = "Find all the words. Click on all the letters of a word to \"find\" it."
    gridRestartText.textContent = 'Restart';
    //replaces event listener
    gridBtn.removeEventListener('click', createGrid);
    gridBtn.addEventListener('click', restart);
}
//chooses random integer from 0 to max exclusive
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
//checks if argument is a letter
function isLetter(str) {
    return str.match(/[a-z]/i);
}
function generateLetter() {
    alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let letter = alphabet[getRandomInt(alphabet.length)];
    return letter;
}
function restart() {
    //changes instructions and button text
    instructions.textContent = "Add words by typing them in and clicking \"Add Word\" or hitting enter. Words can be deleted by clicking on them."
    gridRestartText.textContent = 'Create Word Search';
    //replaces event listener
    gridBtn.removeEventListener('click', restart)
    gridBtn.addEventListener('click', createGrid);
    //gets rid of all words displayed
    wordList.innerHTML = '';
    //gets rid of word search
    gridContainer.innerHTML = '';
    //clears list of words
    words = [];
}