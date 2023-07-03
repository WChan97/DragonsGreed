function rollDice() {
	return Math.floor(Math.random() * 6) + 1;
}

function startGame() {
	var playerCount = parseInt(document.getElementById("playerCount").value);
	var roundCount = parseInt(document.getElementById("roundCount").value);
	var gameStatus = document.getElementById("gameStatus");
	var gameContainer = document.getElementById("gameContainer");
	gameContainer.innerHTML = "";

	var table = document.createElement("table");
	table.id = "gameTable";

	var headerRow = table.insertRow();
	headerRow.innerHTML =
		"<th>Player</th><th>Hand</th><th>Total</th><th>Score</th><th>Action</th>";

	for (var i = 1; i <= playerCount; i++) {
		var row = table.insertRow();
		row.innerHTML =
			"<td>Player " +
			i +
			"</td><td>---</td><td>---</td><td>0</td><td><button onclick='rollAdditionalHand(" +
			(i - 1) +
			")' disabled>Greed More</button>   <button onclick='holdHand(" +
			(i - 1) +
			")' disabled>I'm Satisfied</button></td>";
	}

	gameContainer.appendChild(table);

	var nextRoundButton = document.createElement("button");
	nextRoundButton.textContent = "Next Round";
	nextRoundButton.id = "nextRoundButton";
	nextRoundButton.style.display = "block";
	nextRoundButton.onclick = startNextRound;

	gameContainer.appendChild(nextRoundButton);
	gameContainer.style.display = "block";

	// Call rollNewHand for all players
	for (var i = 0; i < playerCount; i++) {
		rollNewHand(i);
	}

	// Display current round and remaining rounds in gameStatus
	gameStatus.textContent = "Round " + 1 + " out of " + roundCount;
	gameStatus.style.display = "block";

	// Enable Roll Dice and Hold Hand buttons after a delay
	setTimeout(function () {
		var buttons = document.getElementsByTagName("button");
		for (var i = 0; i < buttons.length; i++) {
			buttons[i].disabled = false;
		}
	}, 1000);
}

function startNextRound() {
	var table = document.getElementById("gameTable");
	var rows = table.getElementsByTagName("tr");
	var playerCount = rows.length - 1; // Subtract 1 for header row

	for (var i = 1; i <= playerCount; i++) {
		var row = rows[i];
		var handCell = row.cells[1];
		var totalCell = row.cells[2];
		var scoreCell = row.cells[3];

		var hand = handCell.textContent;
		var total = totalCell.textContent;
		var score = scoreCell.textContent;

		if (hand !== "---") {
			scoreCell.textContent = parseInt(score) + (isNaN(parseInt(total)) ? 0 : parseInt(total));
		} else {
			scoreCell.textContent = parseInt(score) + 0; // Set score to 0 for players who bust
		}
		rollNewHand(i - 1);
	}

	var gameStatus = document.getElementById("gameStatus");
	var currentRound = parseInt(gameStatus.textContent.split(" ")[1]);
	var roundCount = parseInt(document.getElementById("roundCount").value);


	// Enable Roll Dice and Hold Hand buttons for next round
	var buttons = document.getElementsByTagName("button");
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].disabled = false;
	}

	if (currentRound === roundCount) {
		determineWinner();
	} else {
		gameStatus.textContent = "Round " + (currentRound + 1) + " out of " + roundCount;
	}

}



function rollNewHand(playerIndex) {
	var table = document.getElementById("gameTable");
	var rows = table.getElementsByTagName("tr");
	var row = rows[playerIndex + 1];
	var handCell = row.cells[1];

	var diceRoll1 = rollDice();
	var diceRoll2 = rollDice();
	var diceRoll3 = rollDice();

	var newHand = "(" + diceRoll1 + " + " + diceRoll2 + " + " + diceRoll3 + ")";
	var total = diceRoll1 + diceRoll2 + diceRoll3;

	handCell.textContent = newHand;
	row.cells[2].textContent = total;
}

function rollAdditionalHand(playerIndex) {
	var table = document.getElementById("gameTable");
	var rows = table.getElementsByTagName("tr");
	var row = rows[playerIndex + 1];
	var handCell = row.cells[1];
	var hand = handCell.textContent.trim(); // Current hand value

	var total = eval(hand.replace(/[^0-9+*/.-]/g, ''));

	var diceCount = parseInt(prompt("How many dice do you want to roll? Minimum of 2.", 2));

	if (isNaN(diceCount) || diceCount < 2) {
		diceCount = 2;
	}

	var diceRolls = [];
	for (var i = 0; i < diceCount; i++) {
		var diceRoll = rollDice();
		diceRolls.push(diceRoll);
		total += diceRoll;
	}

	var newHand = hand !== '---' ? hand + " + " + diceRolls.join(" + ") : "(" + diceRolls.join(" + ") + ")";

	handCell.textContent = newHand;

	if (total > 18) {
		row.cells[2].textContent = "BUST";
	} else if (hand !== '---') {
		row.cells[2].textContent = total;
	}

	// Disable Roll Dice and Hold Hand buttons
	var rollDiceButton = row.cells[4].getElementsByTagName("button")[0];
	var holdHandButton = row.cells[4].getElementsByTagName("button")[1];
}

function holdHand(playerIndex) {
	var table = document.getElementById("gameTable");
	var rows = table.getElementsByTagName("tr");
	var row = rows[playerIndex + 1];

	// Disable Roll Dice and Hold Hand buttons
	var rollDiceButton = row.cells[4].getElementsByTagName("button")[0];
	var holdHandButton = row.cells[4].getElementsByTagName("button")[1];
	rollDiceButton.disabled = true;
	holdHandButton.disabled = true;
}

function determineWinner() {
	var table = document.getElementById("gameTable");
	var rows = table.getElementsByTagName("tr");
	var playerCount = rows.length - 1; // Subtract 1 for header row
	var maxScore = 0;
	var winners = [];

	for (var i = 1; i <= playerCount; i++) {
		var row = rows[i];
		var score = parseInt(row.cells[3].textContent);

		if (score > maxScore) {
			maxScore = score;
			winners = [i];
		} else if (score === maxScore) {
			winners.push(i);
		}
	}

	var gameStatus = document.getElementById("gameStatus");
	gameStatus.textContent = "Game Over! Winners: " + winners.map(winner => "Player " + winner).join(", ");

	// Disable all buttons except the "Start Game" button
	var buttons = document.getElementsByTagName("button");
	for (var i = 0; i < buttons.length; i++) {
		var button = buttons[i];
		if (button.id !== "startGameButton") {
			button.disabled = true;
		}
	}

	// Hide the "Next Round" button
	var nextRoundButton = document.getElementById("nextRoundButton");
	nextRoundButton.style.display = "none";

	// Create a new table with all players' scores
	var scoreTable = document.createElement("table");
	var headerRow = scoreTable.insertRow();
	headerRow.innerHTML = "<th>Player</th><th>Score</th>";

	for (var i = 1; i <= playerCount; i++) {
		var row = rows[i];
		var score = parseInt(row.cells[3].textContent);
		var playerName = "Player " + i;

		var scoreRow = scoreTable.insertRow();
		scoreRow.innerHTML = "<td>" + playerName + "</td><td>" + score + "</td>";
	}

	// Clear the game table
	table.innerHTML = "";

	// Display the new score table
	var gameContainer = document.getElementById("gameContainer");
	gameContainer.appendChild(scoreTable);
}
