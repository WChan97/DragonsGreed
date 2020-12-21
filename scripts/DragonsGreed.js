//DragonsGreed.js
//This file handles all calculations and events.

// Pre-Game
// Define the number of players, and how many should be handled by the computer

//var numPlayers = 2;
var playerName = "Gold Dragon";
//var isComputer = true;
//var playerHand;
//var playerValue;
//var playerPoints;
//var players = [numPlayers];

function demo() {
    var newName;
    var oldName;
    var txt;
    var player = prompt("Please enter your name:", playerName);
    if (player == null || player == "") {
        txt = "User cancelled the prompt.";
    } else {
        txt = "Hello " + player + "! How are you today?";
    }
    document.getElementById("demo").innerHTML = txt;
}

// Start Game
//

//Old Javascript Prototype
var d6 = [1, 2, 3, 4, 5, 6];
var hand;
var player1Hand;

function rollDice(d6) {
    var randomNumber = Math.floor(d6.length * Math.random());
    return d6[randomNumber];
}

function playGame() {
    //Enable Buttons, and clear divs
    document.getElementById("take-button").disabled = false;
    document.getElementById("keep-button").disabled = false;
    document.getElementById("rolls").innerHTML = '';
    document.getElementById("value").innerHTML = '';
    document.getElementById("result").innerHTML = '';

    player1Hand = [rollDice(d6), rollDice(d6), rollDice(d6)];
    console.log('Player Rolls: ' + player1Hand);
    console.log('Player Value: ' + getHandValue(player1Hand));

    document.getElementById("rolls").innerHTML = 'Player Rolls: ' + player1Hand;
    document.getElementById("value").innerHTML = 'Total Value: ' + getHandValue(player1Hand);
    specialEvents(player1Hand);
}

function getHandValue(hand) {
    var sum = 0;
    for (var i = 0; i < hand.length; i++) {
        sum += hand[i];
    }
    return sum;
}

function take() {
    console.log('Player reaches for more gold.');
    player1Hand.push(rollDice(d6), rollDice(d6));
    console.log('Total Rolls: ' + player1Hand)
    console.log('Total Value: ' + getHandValue(player1Hand))
    //refresh number
    document.getElementById("rolls").innerHTML = 'Total Rolls: ' + player1Hand;
    document.getElementById("value").innerHTML = 'Total Value: ' + getHandValue(player1Hand);
    document.getElementById("take-button").disabled = true;
    if (getHandValue(player1Hand) > 18) {
        console.log('Player Bust');
        document.getElementById("result").innerHTML = 'Player Bust';

        document.getElementById("keep-button").disabled = true;
    }
}

function keep() {
    console.log('Player is satisfied');
    console.log('Total Value: ' + getHandValue(player1Hand))
    document.getElementById("value").innerHTML = 'Total Value: ' + getHandValue(player1Hand);
    document.getElementById("result").innerHTML = 'Points kept: ' + getHandValue(player1Hand);
    document.getElementById("take-button").disabled = true;
    document.getElementById("keep-button").disabled = true;
}

function specialEvents(hand) {
    
}