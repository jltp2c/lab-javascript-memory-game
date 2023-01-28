const cards = [
  { name: "aquaman", img: "aquaman.jpg" },
  { name: "batman", img: "batman.jpg" },
  { name: "captain america", img: "captain-america.jpg" },
  { name: "fantastic four", img: "fantastic-four.jpg" },
  { name: "flash", img: "flash.jpg" },
  { name: "green arrow", img: "green-arrow.jpg" },
  { name: "green lantern", img: "green-lantern.jpg" },
  { name: "ironman", img: "ironman.jpg" },
  { name: "spiderman", img: "spiderman.jpg" },
  { name: "superman", img: "superman.jpg" },
  { name: "the avengers", img: "the-avengers.jpg" },
  { name: "thor", img: "thor.jpg" },
  { name: "aquaman", img: "aquaman.jpg" },
  { name: "batman", img: "batman.jpg" },
  { name: "captain america", img: "captain-america.jpg" },
  { name: "fantastic four", img: "fantastic-four.jpg" },
  { name: "flash", img: "flash.jpg" },
  { name: "green arrow", img: "green-arrow.jpg" },
  { name: "green lantern", img: "green-lantern.jpg" },
  { name: "ironman", img: "ironman.jpg" },
  { name: "spiderman", img: "spiderman.jpg" },
  { name: "superman", img: "superman.jpg" },
  { name: "the avengers", img: "the-avengers.jpg" },
  { name: "thor", img: "thor.jpg" },
];

const memoryGame = new MemoryGame(cards);
memoryGame.shuffleCards();
console.log(memoryGame.shuffleCards());
window.addEventListener("load", (event) => {
  let html = "";
  memoryGame.cards.forEach((pic) => {
    html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `;
  });

  // Add all the divs to the HTML
  document.querySelector("#memory-board").innerHTML = html;

  // Bind the click event of each element to a function
  document.querySelectorAll(".card").forEach((card) => {
    // card.classList.add("blocked");
    card.addEventListener("click", () => {
      if (memoryGame.pickedCards.length === 2) {
        return;
      } //va permettre de bloquer les cartes

      card.classList.toggle("turned");
      // let cardArrayStored = memoryGame.pickedCards; il ne faut pas declarer une nouvelle variable pour un tableau car ce n'est pas le meme

      if (memoryGame.pickedCards.length < 2) {
        // card.classList.remove("blocked");
        memoryGame.pickedCards.push(card);
        console.log("the cards stored are:", memoryGame.pickedCards);
      }

      if (memoryGame.pickedCards.length === 2) {
        console.log(
          "card1 turned",
          memoryGame.pickedCards[0].attributes[1].value
        );
        console.log(
          "card2 turned",
          memoryGame.pickedCards[1].attributes[1].value
        );
        let card1 = memoryGame.pickedCards[0].attributes[1].value;
        let card2 = memoryGame.pickedCards[1].attributes[1].value;

        let cardComparaison = memoryGame.checkIfPair(card1, card2);
        document.querySelector("#pairs-clicked").innerHTML =
          memoryGame.pairsClicked;

        console.log("comparaison is", cardComparaison);

        if (cardComparaison) {
          document.querySelector("#pairs-guessed").innerHTML =
            memoryGame.pairsGuessed;
          memoryGame.pickedCards = [];
          console.log("the array is reset", memoryGame.pickedCards);
          let finished = memoryGame.checkIfFinished();
          const modal = document.getElementById("dialog");
          const clicked = document.getElementById("clicked");
          const guessed = document.getElementById("guessed");
          const displayClicked = document.getElementById("pairsClicked");
          const displayGuessed = document.getElementById("pairsGuessed");
          if (finished) {
            console.log("yeeeeeeeeeeeeeeeeeeeeeeeey NICE");
            //I don't know how to reload without refreshing the page ... so i cheat
            setTimeout(() => {
              modal.showModal();
              displayClicked.textContent = "Pairs clicked :";
              clicked.innerHTML = memoryGame.pairsClicked;
              displayGuessed.textContent = "Pairs guessed :";
              guessed.innerHTML = memoryGame.pairsGuessed;
              restart.addEventListener("click", () => {
                modal.remove();
                location.reload();
              });
            }, 200);
          }
        } else {
          setTimeout(() => {
            memoryGame.pickedCards[0].classList.remove("turned");
            memoryGame.pickedCards[1].classList.remove("turned");
            memoryGame.pickedCards = [];
            console.log("the array is reset", memoryGame.pickedCards);
          }, 1000);

          //blocked here tying to find a solution concerning the logic to pushing another round card after
        }
      }

      //trouver la logique de fin de partie
      // console.log(`Card clicked: ${card}`);
    });
  });
});
