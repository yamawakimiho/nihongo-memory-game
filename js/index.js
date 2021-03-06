const startButton = document.getElementById("startButton");
const gamePanel = document.getElementById("gamePanel");
const gameDescriptionPanel = document.getElementById("gameDescriptionPanel");
const scored = document.getElementById("scored");
const mistaken = document.getElementById("mistaken");

const nihongoList = returnNihongoList();

let openedCards = [];
let [scoredPoints,mistakenPoints] = [0,0];

startButton.addEventListener('click', () => changeButtonAndDescription() );

function changeButtonAndDescription(){

  startButton.innerHTML = "<span>ăȘă»ăă</span>";
  gameDescriptionPanel.classList.remove("none");

  prepareGame();
}

function prepareGame(){
  resetPoints();
  organizeCards(shuffleArray(generateIdsToArray()).slice(0,10));
}

function generateIdsToArray(){
  let ids = nihongoList.map(n => parseInt(n.id));  

  return ids;
}

function shuffleArray(list) {
  return list.sort(() => Math.random() - 0.5);
}

function organizeCards(cardIds){
  let arrayOfCards = [];
  let divs = "";

  cardIds.forEach((item) => {
    arrayOfCards.push(`<div class="cards cards-lower" data-nihongo="${nihongoList[item].id}">
    <pre>${nihongoList[item].kanji}</pre><pre>${nihongoList[item].english}</pre></div>`);
    arrayOfCards.push(`<div class="cards cards-lower" data-nihongo="${nihongoList[item].id}">
    <pre>${nihongoList[item].hiragana}</pre><pre>${nihongoList[item].english}</pre></div>`);
  })

  shuffleArray(arrayOfCards).map(el => divs += el );

  gamePanel.innerHTML = divs;

  startGameForReal();
}

function startGameForReal(){
  const cards = document.querySelectorAll('.cards');

  cards.forEach(card => card.addEventListener('click', faceUpCards));
}

function faceUpCards() {
  openedCards.push(this);

  if(openedCards.length === 2){
    gamePanel.classList.add("blocked");
    checkForMatches();
  }

  faceDownCards(this);
}

function checkForMatches(){
    (openedCards[0].dataset.nihongo === openedCards[1].dataset.nihongo) 
    ? match() :  unmatch()
}

function match(){
  Array.prototype.filter.call(openedCards, openedCards => openedCards.classList.add('matched'))
  gamePanel.classList.remove("blocked");
  openedCards = [];
  setPoints('score');
}

function unmatch(){
  setTimeout(() =>{
  Array.prototype.filter.call(openedCards, openedCards => faceDownCards(openedCards))
  gamePanel.classList.remove("blocked");
  openedCards = []},2200);
  setPoints('mistake');
  
}

function faceDownCards(allCards){
  allCards.classList.toggle('flip');
  allCards.classList.toggle('blocked');
  allCards.classList.toggle('cards-lower');
  startButton.classList.toggle('blocked');
}

function setPoints(type){
  if(type == 'score'){
    scoredPoints++;
    scored.textContent = scoredPoints;

      if(scoredPoints === 10){
        gamePanel.innerHTML =  congratulationsDiv();
      }

  }else{
    mistakenPoints++;
    mistaken.textContent = mistakenPoints;
  } 
}

function resetPoints(){
  [scoredPoints,mistakenPoints] = [0,0];
  scored.textContent = 0;
  mistaken.textContent = 0;
}

function congratulationsDiv(){
  return `<div class="congratulations">
    <h1>Thank you for playing this mini game!</h1>
    <p>If you want to play again, press ăȘă»ăă button above.
    if you have any question, feel free to <a href="https://github.com/luciayamawaki" target="_blank">send me a message</a></p>
    <br>
    <h1><ruby><rb>æćŸ<rt>ăăă</ruby>ăŸă§<ruby><rb>é<rt>ăă</ruby>ăă§ăăă ăăăăăăšăăăăăŸăă</h1>
    <p>äžăźăȘă»ăăăăżăłă<ruby><rb>æŒ<rt>ă</ruby>ăăŠăăă ăă°ăăăäžć<ruby><rb>é<rt>ăă</ruby>ăčăŸăă</p>
    <p><ruby><rb>èłȘć<rt>ăă€ăă</ruby>ă<ruby><rb>èŠæ<rt>ăăăŒă</ruby>ăȘă©<ruby><rb>ć<rt>ăă</ruby>ăä»ăăŠăăăŸăăźă§ă<ruby><rb>æ°è»œ<rt>ăăă</ruby>ă«ă<ruby><rb>éŁç”Ą<rt>ăăăă</ruby>ăă ăăă</p>
    </div>
  `;
}
