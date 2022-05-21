const wordList = document.querySelector('#word-list');
const textBox = document.querySelector('#text-box')
const addWordBtn = document.querySelector('#submit-btn');
const warningDisplay = document.querySelector('#warning')

addWordBtn.addEventListener('click', addWord);

//adds word
function addWord() {
    ///getting word from textbox and clears it
    let word = textBox.value;
    textBox.value = '';
    //creating new list element with text if word is valid
    if (validateWord(word)) {
        let newWordEl = document.createElement('ul');
        newWordEl.setAttribute('class','word')
        let newWordText = document.createTextNode(word);
        newWordEl.append(newWordText);
        //adding new element to actual list
        wordList.appendChild(newWordEl);
    }
}

//checks whether word is valid and changes warning display accordingly
function validateWord(word) {
    //makes sure word is not too long
    if (word.length > 8) {
        warningDisplay.textContent = "Word must contain no more than 8 characters";
        return false;
    //makes sure word only contains letters
    } else if(!/^[a-zA-Z]+$/.test(word)) {
        warningDisplay.textContent = "Word must only contain letters"
        return false;
    }
    warningDisplay.textContent = '';
    return true;
}