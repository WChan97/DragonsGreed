//DragonsGreed.js
//This file handles all calculations and events.

// Pre-Game
// Define the number of players, and how many rounds.
var numPlayers = 3;
var numRounds = 10;
//Players are [isActive, isNPC, playerName, playerPoints, playerValue]
var player1 = [false, false, "Player 1", 0, 0];
var player2 = [false, true, "Player 2", 0, 0];
var player3 = [false, true, "Player 3", 0, 0];
var player4 = [false, true, "Player 4", 0, 0];
var player5 = [false, true, "Player 5", 0, 0];
var player6 = [false, true, "Player 6", 0, 0];
var player7 = [false, true, "Player 7", 0, 0];
var player8 = [false, true, "Player 8", 0, 0];
var playerList = [player1, player2, player3, player4, player5, player6, player7, player8];

function setup() {
    var playerLoop;
    //Ask how many players
    numPlayers = prompt("How many Players for this game?", numPlayers);
    //Ask how many rounds
    numRounds = prompt("How many Rounds for this game?", numRounds);

    //Toggle Active Players
    playerLoop = numPlayers;
    while (playerLoop >= 1) {
        //Toggle isActive. I'll be honest, I have no idea how this is possible.
        (playerList[playerLoop - 1])[0] = true;
        //console.log(playerList[playerLoop - 1]);
        playerLoop--;
    }
    //Create Table with active players & rounds
    createTable(numPlayers, numRounds);

    //Start Game
    //startGame(numPlayers,numRounds);  
}

function createTable(numPlayers, numRounds) {
    //Create table based on Number of Players and Rounds.
    var columns = numPlayers;
    columns++;
    var rows = numRounds;
    rows++;
    rows++;
    rows++;
    var totalPointRow = numRounds;
    totalPointRow++;
    var buttonRow = totalPointRow;
    buttonRow++;

    var tableDiv = document.getElementById("dynamicPlayerTable");

    var table = document.createElement('TABLE');
    table.border = '1';

    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);
    for (var i = 0; i < rows; i++) {
        var tr = document.createElement('TR');
        tableBody.appendChild(tr);

        for (var j = 0; j < columns; j++) {
            var td = document.createElement('TD');
            td.width = '100';
            if (i == 0 && j == 0) {
                td.appendChild(document.createTextNode(""));
            } else if (i == 0 && j != 0) {
                td.appendChild(document.createTextNode((playerList[j - 1])[2]));
            } else if (i != 0 && i <= numRounds && j == 0) {
                td.appendChild(document.createTextNode("Round: " + i));
            } else if (i != 0 && i == totalPointRow && j == 0) {
                td.appendChild(document.createTextNode("Total Points:"));
            } else if (i == totalPointRow && j != 0) {
                td.appendChild(document.createTextNode("sum"));
            } else if (i != 0 && i == buttonRow && j == 0) {
                td.appendChild(document.createTextNode("Buttons:"));
            } else if (i == buttonRow && j != 0) {
                td.appendChild(document.createTextNode("button"));
            } else {
                td.appendChild(document.createTextNode([rollDice(d6), rollDice(d6), rollDice(d6)]));
            }
            tr.appendChild(td);
        }
    }

    tableDiv.appendChild(table);
}

//Demo test functions
function demo() {
    var txt = 'demo in progress';
    setup();
    document.getElementById("demo").innerHTML = txt;
}



var playerName = "Gold Dragon";
//var isComputer = true;
//var playerHand;
//var playerValue;
//var playerPoints;
//var players = [numPlayers];


// Start Game
//

//Old Javascript Prototype
var d6 = [1, 2, 3, 4, 5, 6];
var hand;
var player1Hand;
var tripleOne = [1, 1, 1];
var tripleTwo = [2, 2, 2];
var tripleThree = [3, 3, 3];
var tripleFour = [4, 4, 4];
var tripleFive = [5, 5, 5];
var tripleSix = [6, 6, 6];

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
    console.log(hand);
    if (hand == tripleOne || hand == tripleTwo || hand == tripleThree || hand == tripleFour || hand == tripleFive || hand == tripleSix) {
        console.log('Win Condition');
        document.getElementById("demo").innerHTML = 'Win condition';
    }
}
