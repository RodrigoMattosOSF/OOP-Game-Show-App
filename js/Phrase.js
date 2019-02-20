/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    constructor(phrase) {
        this.phrase = phrase;
        this.ul     = null;
    }

    addPhraseToDisplay() {
        this.ul = app.phrase.children[0];

        for (let l = 0; l < this.phrase.length; l++) {
            let letter = this.phrase[l];
            let li     = document.createElement('li');
            
            if (letter.match(/[a-z]|[A-Z]$/g)) {
                li.classList.add('hide');
                li.classList.add('letter');
                li.classList.add(letter.toLowerCase());
            } else {
                li.classList.add('space');                
            }

            li.textContent = letter;
            this.ul.appendChild(li);
        }

    }

    checkLetter(letter) {
        let letters = this.ul.querySelector('li.'+letter+'.hide');

        return letters;
    }

    showMatchedLetter(letter) {
        let letters = this.ul.querySelectorAll('li.' + letter + '.hide');

        for (let l = 0; l < letters.length; l++) {
            let letter = letters[l];
            letter.classList.remove('hide');
            letter.classList.add('show');
        }

        return letter.length;
    }
}