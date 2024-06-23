import GAMES_DATA from './games.js';

const GAMES_JSON = JSON.parse(GAMES_DATA);

function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const gamesContainer = document.getElementById("games-container");

function addGamesToPage(games) {
    for (let i = 0; i < games.length; i++) {
        let gameCard = document.createElement('div');
        gameCard.classList.add('game-card');

        let game = games[i];
        gameCard.innerHTML = `
            <img src="${game.img}" alt="${game.name}" class="game-img">
            <div class="game-info">
                <h2>${game.name}</h2>
                <p>${game.description}</p>
                <p>Backers: ${game.backers.toLocaleString()}</p>
            </div>
        `;

        gamesContainer.appendChild(gameCard);
    }
}

addGamesToPage(GAMES_JSON);

const contributionsCard = document.getElementById("num-contributions");
const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;

const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `${GAMES_JSON.length}`;

function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
    addGamesToPage(unfundedGames);

    const descriptionContainer = document.getElementById("description-container");
    deleteChildElements(descriptionContainer);

    const numUnfunded = unfundedGames.length;
    const unfundedStr = `So far, we've raised $${totalRaised.toLocaleString()} for ${GAMES_JSON.length} games. ${numUnfunded === 0 ? 'All games are funded!' : `However, ${numUnfunded} ${numUnfunded === 1 ? 'game remains' : 'games remain'} unfunded.`}`;
    const unfundedGamesDescription = document.createElement('p');
    unfundedGamesDescription.innerHTML = unfundedStr;
    descriptionContainer.appendChild(unfundedGamesDescription);
}

function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    addGamesToPage(fundedGames);

    const descriptionContainer = document.getElementById("description-container");
    deleteChildElements(descriptionContainer);

    const numUnfunded = GAMES_JSON.filter(game => game.pledged < game.goal).length;
    const unfundedStr = `So far, we've raised $${totalRaised.toLocaleString()} for ${GAMES_JSON.length} games. ${numUnfunded === 0 ? 'All games are funded!' : `However, ${numUnfunded} ${numUnfunded === 1 ? 'game remains' : 'games remain'} unfunded.`}`;
    const unfundedGamesDescription = document.createElement('p');
    unfundedGamesDescription.innerHTML = unfundedStr;
    descriptionContainer.appendChild(unfundedGamesDescription);
}

function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);

    const descriptionContainer = document.getElementById("description-container");
    deleteChildElements(descriptionContainer);

    const numUnfunded = GAMES_JSON.filter(game => game.pledged < game.goal).length;
    const unfundedStr = `So far, we've raised $${totalRaised.toLocaleString()} for ${GAMES_JSON.length} games. ${numUnfunded === 0 ? 'All games are funded!' : `However, ${numUnfunded} ${numUnfunded === 1 ? 'game remains' : 'games remain'} unfunded.`}`;
    const unfundedGamesDescription = document.createElement('p');
    unfundedGamesDescription.innerHTML = unfundedStr;
    descriptionContainer.appendChild(unfundedGamesDescription);
}

const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

unfundedBtn.addEventListener('click', filterUnfundedOnly);
fundedBtn.addEventListener('click', filterFundedOnly);
allBtn.addEventListener('click', showAllGames);

const descriptionContainer = document.getElementById("description-container");
const numUnfunded = GAMES_JSON.filter(game => game.pledged < game.goal).length;
const unfundedStr = `A total of ${numUnfunded} ${numUnfunded === 1 ? 'game is' : 'games are'} unfunded. We need your help to fund these amazing games!`;
const unfundedGamesDescription = document.createElement('p');
unfundedGamesDescription.innerHTML = unfundedStr;
descriptionContainer.appendChild(unfundedGamesDescription);

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => item2.pledged - item1.pledged);
const [topGame, runnerUpGame] = sortedGames;

const topGameElement = document.createElement('div');
topGameElement.innerHTML = `
    <h2>${topGame.name}</h2>
    <p>Pledged: $${topGame.pledged.toLocaleString()}</p>
`;
firstGameContainer.appendChild(topGameElement);

const runnerUpGameElement = document.createElement('div');
runnerUpGameElement.innerHTML = `
    <h2>${runnerUpGame.name}</h2>
    <p>Pledged: $${runnerUpGame.pledged.toLocaleString()}</p>
`;
secondGameContainer.appendChild(runnerUpGameElement);
