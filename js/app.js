/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

class App {
    constructor() {
        console.log('Starting application...');
        this.game = null;

        //Containers
        this.qwerty     = document.getElementById('qwerty');
        this.buttons    = this.qwerty.querySelectorAll('button.key');
        this.phrase     = document.getElementById('phrase');
        this.scoreboard = document.getElementById('scoreboard');
        this.points     = document.getElementById('points');
        this.lifes      = this.scoreboard.querySelectorAll("ol li img");
        this.gameOver   = document.getElementById('game-over-message');

        //Buttons
        this.startBtn = document.getElementById('btn__reset');

        console.log('Adding game events...');
        this.startBtn.addEventListener('click', event => {
            app.game = new Game();
            
            app.qwerty.addEventListener('click', this.qwertyHandler);
            document.addEventListener('keypress', this.keyboardHandler);
            app.game.startGame();
        });
    }

    qwertyHandler(event) {
        let element = event.target;
        //check if its a button from the qwerty section
        if (element.tagName === 'BUTTON') {
            //check if the class of button is a key
            if (element.classList.contains('key') && !(element.classList.contains('chosen') || element.classList.contains('wrong'))) {
                app.game.handleInteraction(element.textContent);
            }
        }
    }

    keyboardHandler(event) {
        app.game.handleInteraction(event.key);
    }
}

var app = new App();