/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor() {
        console.log('Setting game variables...');
        //Screens
        this.initialScrn = document.getElementById('overlay');        

        //Stats
        this.missed    = 0;
        this.chances   = 5;
        this.points    = 0;
        this.reward    = 10;
        this.multiplier = 1;
        this.liveHeart = 'images/liveHeart.png';
        this.lostHeart = 'images/lostHeart.png';

        //Phrases        
        this.phrases = [
            'Is the grin, diamond better than the government.',
            'Did the succulent imagination, really buzz the unique.',
            'It was then the, scattered vegetable met the flickering blue.',
            'The athletic, letter escapes into the complicated dad.',
            'It was then the complete, award met the ambitious count.'
        ];
        this.activePhrase = null;        
    }

    startGame() {
        app.game.initialScrn.style.display = 'none';
        this.activePhrase                  = new Phrase(this.getRandomPhrase());

        this.activePhrase.addPhraseToDisplay();

        console.log('Active phrase: ' + this.activePhrase.phrase);
        console.log('Game Started!');
    }

    //https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getRandomPhrase() {
        var ri = this.getRandomIntInclusive(0, this.phrases.length - 1);

        return this.phrases[ri];
    }

    handleInteraction(letter) {
        console.log('Button ' + letter.toLowerCase() + ' pressed!');
        const element = Array.from(app.buttons).find( button => button.textContent == letter.toLowerCase());
        
        if (element) {                                
            let letter = element.textContent;
            let parent = element.parentNode;

            parent.classList.add('key-pressed');
            if (this.activePhrase.checkLetter(letter)) {
                console.log('Has letter (' + letter + ')');
                let amount  = this.activePhrase.showMatchedLetter(letter);
                let points  = (this.reward * amount) * this.multiplier;

                element.classList.add('chosen');
                this.points += points;
                this.multiplier++;
                app.points.innerHTML = this.points;

                if (this.checkForWin())
                    this.gameOver(true);

            } else {
                console.log('Letter (' + letter + ') not found');
                element.classList.add('wrong');
                this.multiplier = 1;
                this.removeLife();
            }
        }
    }

    removeLife() {
        let lifes = app.scoreboard.querySelectorAll("ol li img[src='" + this.liveHeart + "'");
         
        if (this.chances > 0) {
            let lifeCount = lifes.length - 1;
            let life      = lifes[lifeCount];
            this.missed++;
            life.setAttribute('src', this.lostHeart);
            console.log('Lifes left: ' + lifeCount);
        }

        if (this.missed == this.chances)
            this.gameOver(false);        
    }

    checkForWin() {
        let letters = this.activePhrase.ul.querySelectorAll('li.hide');

        return !letters.length;
    }

    gameOver(win) {
        if (win) {
            console.log('Game Over: Winner!');
            app.game.initialScrn.style.display = 'flex';
            app.gameOver.textContent = 'Congratulations you won! \r\n The score was ' + this.points;
            app.game.initialScrn.classList.add('win');
        } else {
            console.log('Game Over: Loser!');
            app.game.initialScrn.style.display = 'flex';
            app.gameOver.textContent = 'Better luck next time! \r\n The score was ' + this.points;
            app.game.initialScrn.classList.add('lose');
        }

        //Reset Stats
        this.missed     = 0;
        this.multiplier = 1;
        this.points     = 0;

        //Reset points
        app.points.textContent = '0';

        //Reset phrase
        this.activePhrase.ul.innerHTML = '';

        //Reset lifes
        app.lifes.forEach( life => life.setAttribute('src', this.liveHeart) );

        //Reset qwerty
        app.buttons.forEach(button => { 
            let parent       = button.parentNode;
            button.className = 'key';

            parent.classList.remove('key-pressed');
        });

        //Remove game events
        app.qwerty.removeEventListener('click', app.qwertyHandler);
        document.removeEventListener('keypress', app.keyboardHandler);
    }
}