    
    
var l = 0, w = 0, d = 0;
let blackjackgame = {
    'you':{'scorespan': '#your_result', 'div': '#your_box', 'score': 0},
    'dealer':{'scorespan': '#dealer_result', 'div': '#dealer_box', 'score': 0},
    'cards':['2','3','4','5','6','7','8','9','10','K','Q','J','A'],
    'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'Q':10,'J':10,'A':[1,11]},
    'isStand': false,
    'turnOver': false,
};
const YOU = blackjackgame['you']
const DEALER = blackjackgame['dealer']

document.querySelector("#hit").addEventListener('click', blackjackhit);
document.querySelector("#stand").addEventListener('click', dealerLogic);
document.querySelector("#deal").addEventListener('click', blackjackdeal);



let hit = new Audio('sounds/swish.m4a')
let lost = new Audio('sounds/aww.mp3')
let win = new Audio('sounds/cash.mp3')
let draw = new Audio('sounds/draw.m4a')
let bust = new Audio('sounds/ bust.mp3')
function blackjackhit(){
    if(blackjackgame['isStand'] === false){
        let card = randomcard();
        showcard(card, YOU); 
        updatescore(card, YOU);
        showscore(YOU);
    }
}
 function showcard(card, activeplayer){
    if (activeplayer['score'] <= 21){
        hit.play();
        let cardImage = document.createElement('img');
        cardImage.src = `images/${card}.png`;
        document.querySelector(activeplayer['div']).appendChild(cardImage);
    }
    
 }
function blackjackdeal(){
    if(blackjackgame['turnOver'] === true){
        let yourimages = document.querySelector('#your_box').querySelectorAll('img');
        let dealerimages = document.querySelector('#dealer_box').querySelectorAll('img');
        for(i = 0; i < yourimages.length; i++){
            yourimages[i].remove();
        }
        for(i = 0; i < dealerimages.length; i++){
            dealerimages[i].remove();
        }
        YOU['score'] = 0;
        DEALER['score'] = 0;
        document.querySelector('#your_result').textContent = 0;
        document.querySelector('#your_result').style.color = 'white';
        document.querySelector('#dealer_result').textContent = 0;
        document.querySelector('#dealer_result').style.color = 'white';
        document.querySelector('#display-result').textContent = "Let's' Play";
        document.querySelector('#display-result').style.color = 'Black';
        draw.pause();
        blackjackgame['isStand'] = false;
        blackjackgame['turnOver'] = false;
    }
}
function randomcard(){
    let randomindex = Math.floor(Math.random() * 13)
    return blackjackgame['cards'][randomindex];
}
function updatescore(card, activeplayer){
    
    if (card == 'A'){
        if (activeplayer['score'] + blackjackgame['cardsMap'][card][1] <= 21){
            activeplayer['score'] += blackjackgame['cardsMap'][card][1];
        }
        else{
            activeplayer['score'] += blackjackgame['cardsMap'][card][0];
        }
    }
    else{
        activeplayer['score'] += blackjackgame['cardsMap'][card];
    }
}
function showscore(activeplayer){
    if (activeplayer['score'] <= 21){
        document.querySelector(activeplayer['scorespan']).textContent = activeplayer['score'];
    }
    else{
        document.querySelector(activeplayer['scorespan']).textContent = 'Bust';
        document.querySelector(activeplayer['scorespan']).style.color = 'red';
        
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic(){
    blackjackgame['isStand'] = true;
    while(DEALER['score'] < 16 && blackjackgame['isStand'] === true){
        let card = randomcard();
        showcard(card, DEALER);
        updatescore(card, DEALER);
        showscore(DEALER);
        await sleep(1000);
    }
    blackjackgame['turnOver'] = true;
    showresult(computewinner());
}


function computewinner(){
    let winner;
    if(YOU['score'] <= 21){
        if(YOU['score'] > DEALER['score'] || DEALER['score'] > 21){
            winner = YOU;
        }
        else if(YOU['score'] < DEALER['score']){
            winner = DEALER;
        }
        else if(YOU['score'] == DEALER['score']){
            console.log("You DREW!")
        }
    }
    else if(YOU['score'] > 21 && DEALER['score'] <= 21){
            console.log("You Lost!")
            winner = DEALER;
        }
    else if(YOU['score'] > 21 && DEALER['score'] > 21){
        console.log("You Drew!")
    }
    return winner;
}
function showresult(winner){
    let message, messagecolor;
    if (winner === YOU){
        message = 'You Won!';
        messagecolor = 'green'
        win.play();
        w++;
        document.querySelector('#win').textContent = w
    }
    else if (winner === DEALER){
        message = 'You Lost!';
        messagecolor = 'Red'
        lost.play();
        l++;
        document.querySelector('#loss').textContent = l;
    }
    else{
        message = 'You Drew';
        messagecolor='black';
        draw.play();
        d++
        document.querySelector('#draw').textContent = d;
    }
    document.querySelector('#display-result').textContent = message;
    document.querySelector('#display-result').style.color = messagecolor;
}