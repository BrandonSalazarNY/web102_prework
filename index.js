/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    for (let i = 0; i < games.length; i++) {
        // Step 2: Create a new div element with the class 'game-card'
        let gameCard = document.createElement('div');
        gameCard.classList.add('game-card');

        // Step 3: Use a template literal to set the inner HTML of the div
        let game = games[i];
        gameCard.innerHTML = `
            <img src="${game.img}" alt="${game.name}" class="game-img">
            <div class="game-info">
                <h2>${game.name}</h2>
                <p> ${game.description}</p>
                <p>Backers: ${game.backers}</p>
            </div>
        `;

        // Step 4: Append the game card to the correct element in the DOM
        gamesContainer.appendChild(gameCard);
    }
}

// Step 5: Call the addGamesToPage function with the correct variable
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);

// set the inner HTML using a template literal
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`; // Total backers

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`; // Total amount pledged

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `${GAMES_JSON.length}`; // Total number of games

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);

    // Step 1: Use filter or reduce to sum the number of unfunded games in GAMES_JSON
    const numUnfunded = unfundedGames.length;

    // Step 2: Create a template string to display the required information
    const unfundedStr = `So far, we've raised $${totalRaised.toLocaleString()} for ${GAMES_JSON.length} games. ${numUnfunded === 0 ? 'All games are funded!' : `However, ${numUnfunded} ${numUnfunded === 1 ? 'game remains' : 'games remain'} unfunded.`}`;

    // Step 3: Create a new paragraph element containing the template string and add it to the descriptionContainer
    const descriptionContainer = document.getElementById("description-container");
    const unfundedGamesDescription = document.createElement('p');
    unfundedGamesDescription.innerHTML = unfundedStr;
    descriptionContainer.appendChild(unfundedGamesDescription);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // use the function we previously created to add funded games to the DOM
    addGamesToPage(fundedGames);

    // Step 1: Use filter or reduce to sum the number of unfunded games in GAMES_JSON
    const numUnfunded = GAMES_JSON.filter(game => game.pledged < game.goal).length;

    // Step 2: Create a template string to display the required information
    const unfundedStr = `So far, we've raised $${totalRaised.toLocaleString()} for ${GAMES_JSON.length} games. ${numUnfunded === 0 ? 'All games are funded!' : `However, ${numUnfunded} ${numUnfunded === 1 ? 'game remains' : 'games remain'} unfunded.`}`;

    // Step 3: Create a new paragraph element containing the template string and add it to the descriptionContainer
    const descriptionContainer = document.getElementById("description-container");
    const unfundedGamesDescription = document.createElement('p');
    unfundedGamesDescription.innerHTML = unfundedStr;
    descriptionContainer.appendChild(unfundedGamesDescription);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

    // Step 1: Use filter or reduce to sum the number of unfunded games in GAMES_JSON
    const numUnfunded = GAMES_JSON.filter(game => game.pledged < game.goal).length;

    // Step 2: Create a template string to display the required information
    const unfundedStr = `So far, we've raised $${totalRaised.toLocaleString()} for ${GAMES_JSON.length} games. ${numUnfunded === 0 ? 'All games are funded!' : `However, ${numUnfunded} ${numUnfunded === 1 ? 'game remains' : 'games remain'} unfunded.`}`;

    // Step 3: Create a new paragraph element containing the template string and add it to the descriptionContainer
    const descriptionContainer = document.getElementById("description-container");
    const unfundedGamesDescription = document.createElement('p');
    unfundedGamesDescription.innerHTML = unfundedStr;
    descriptionContainer.appendChild(unfundedGamesDescription);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener('click', filterUnfundedOnly);
fundedBtn.addEventListener('click', filterFundedOnly);
allBtn.addEventListener('click', showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const numUnfunded = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// create a string that explains the number of unfunded games using the ternary operator
const unfundedStr = `A total of ${numUnfunded} ${numUnfunded === 1 ? 'game is' : 'games are'} unfunded. We need your help to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container
const unfundedGamesDescription = document.createElement('p');
unfundedGamesDescription.innerHTML = unfundedStr;
descriptionContainer.appendChild(unfundedGamesDescription);

/*****************F*******************************************************************
 /*****************F*******************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => item2.pledged - item1.pledged);

// use destructuring and the spread operator to grab the first and second games
const [topGame, runnerUpGame, ...rest] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const topGameElement = document.createElement('div');
topGameElement.innerHTML = `
    <h2>${topGame.name}</h2>
    <p>Pledged: $${topGame.pledged.toLocaleString()}</p>
`;
firstGameContainer.appendChild(topGameElement);

// create a new element to hold the name of the second top pledge game, then append it to the correct element
const secondGameElement = document.createElement('div');
secondGameElement.innerHTML = `
    <h2>${runnerUpGame.name}</h2>
    <p>Pledged: $${runnerUpGame.pledged.toLocaleString()}</p>
`;
secondGameContainer.appendChild(secondGameElement);


