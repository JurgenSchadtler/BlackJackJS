/**
 * 2C = Clubs
 * 2D = Diamonds
 * 2S = Spades
 * 2H = Hearts
 */

const myModule = (() => {
    'use strict'

    let deck = [];
    const tipos = ['C','D','H','S'],
          especiales = ['A','J','Q','K'];
    const victorySound = new Audio('assets/Sounds/victory.mp3');
    const defeatSound = new Audio('assets/Sounds/aiwins.mp3');
    const tieSound = new Audio('assets/Sounds/bonk.mp3');
    const shuffleSound = new Audio('assets/Sounds/shuffle.mp3');

    let playersPoints = [];

    //HTML References
    const btnDraw = document.querySelector('#btnDraw'),
          btnStop = document.querySelector('#btnStop'),
          btnNew = document.querySelector('#btnNew');

    const divCardsPlayers = document.querySelectorAll('.divCards'),
          htmlPoints = document.querySelectorAll('small');


    const startGame = (numPlayers = 2) => {
        deck = createDeck();
        playersPoints = [];
        for ( let i = 0; i < numPlayers; i++){
            playersPoints.push(0);
        }

        htmlPoints.forEach(elem => elem.innerText = 0);
        divCardsPlayers.forEach(elem => elem.innerHTML = '');

        btnDraw.disabled = false;
        btnStop.disabled = false; 
    };
        
    //Function that creates new deck
    const createDeck = () => {

        deck = [];
        for(let i = 2; i<=10; i++){
            for( let tipo of tipos){
            deck.push(i + tipo);
        }
    }

        for(let tipo of tipos){
            for(let esp of especiales){
                deck.push( esp + tipo);
            }
        }
        return _.shuffle(deck);
    }

    //Function that grabs a card

    const drawCard = () => {

        if( deck.length === 0){
            throw 'No more cards';
        }
        return deck.pop();
    }

    const cardValue = (carta) => {

        const value = carta.substring(0, carta.length-1);

        return (isNaN(value)) ?
                    (value === 'A') ? 11 : 10
                    : value * 1;

        /* let points = 0;
        console.log({value});
        if ( isNaN(value)){
            //Return true if its not a number
            points = ( value === 'A' ) ? 11: 10;
        }else{
            //Transform string into a number
            points = value * 1;
        }

        console.log(points); */
    }

    //Turn: 0 = first player
    //Last Turn  = AI
    const keepPoints = (carta, turn ) => {
        playersPoints[turn] = playersPoints[turn] + cardValue(carta);
        htmlPoints[turn].innerText = playersPoints[turn];
        return playersPoints[turn];
    };

    const createCard = (carta, turn) => {

        const cardImg = document.createElement('img');
        cardImg.src = `assets/cartas/${carta}.png`;
        cardImg.classList.add('carta');
        divCardsPlayers[turn].append(cardImg);

    }

    const winCondition = () =>{

        const[ minPoints, aiPoints ] = playersPoints;

        setTimeout(() => {
            if(aiPoints === minPoints) {
                tieSound.play();
                alert('Nobody Wins D:');
            }else if (minPoints > 21){
                defeatSound.play();
                alert('AI Wins');
            }else if(aiPoints > 21){
                victorySound.play();
                alert('You Win :D');
            }else{
                defeatSound.play();
                alert('AI Wins');
            }
        },100);
    }


    //AI
    const AI = (minPoints) => {

        let aiPoints = 0;
        do {
                const carta = drawCard();
                aiPoints = keepPoints(carta, playersPoints.length - 1);
                createCard(carta , playersPoints.length - 1);

            }while((aiPoints < minPoints) && (minPoints <=21));

        winCondition();
    }


    //Events
    btnDraw.addEventListener('click', function() {

        const carta = drawCard();
        const playerPoints = keepPoints(carta,0);
        createCard(carta,0);

        if (playerPoints > 21){
            console.warn('You lost');
            btnDraw.disabled = true;
            btnStop.disabled = true;
            AI(playerPoints);
        }else if (playerPoints === 21){
            console.warn('You are a winner');
            btnDraw.disabled = true;
            btnStop.disabled = true;
            AI(playerPoints);
        }

    });

    btnStop.addEventListener('click', () => {

        btnDraw.disabled = true;
        btnStop.disabled = true;

        AI(playersPoints[0]);
    });

    btnNew.addEventListener('click',() =>{
        shuffleSound.play();
        startGame();
    });


    return{
        
        newGame: startGame
    };

})();








