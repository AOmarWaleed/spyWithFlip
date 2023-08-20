let numofPlayersEl = document.getElementById("numOfPlayers");
let scratchEl = document.getElementById("scratch");
let spyPlayerEl = document.getElementById("spyPlayer");

let playerCard = document.getElementById("playerCard");
let playBtn = document.getElementById("playBtn");
let timeEl = document.getElementById("time");
let showTime = document.getElementById("showTime");

let numofPlayers = 3;
let time = 5;
let counter = 1;

let fadeTime = 500;

//btn in the home page (display the home and show the sittings)
$("#playBtn").click(() => {
  $("#welocomePage").fadeOut(fadeTime, () => {
    $("#settings").fadeIn(fadeTime);
  });
});

//*******************************SETTINGS */
//icon to decrease the playNo (atleast 2 players)
$("#minus").click(() => {
  if (numofPlayers <= 3) return;
  numofPlayers -= 1;
  setNumOfPlayers();
});
//icon to increase the playNo (with max 25 players)
$("#plus").click(() => {
  if (numofPlayers > 25) return;
  numofPlayers += 1;
  setNumOfPlayers();
});

//icon to decrease the playTime (atleast 1 mins)
$("#minusTime").click(() => {
  if (time <= 1) return;
  time -= 1;
  setTime();
});

//icon to increase the playTime (with max 20 mins)
$("#plusTime").click(() => {
  if (time >= 20) return;
  time += 1;
  setTime();
});

setNumOfPlayers();
function setNumOfPlayers() {
  numofPlayersEl.innerText = numofPlayers;
}
setTime();
function setTime() {
  timeEl.innerText = time;
}

//************************************************** CARDS*/
playerCard.addEventListener("click", (e) => {
  if (e.target.innerText == "Next Player") {
    diplayPlayerCard();
    // makeScratchCard();
    counter += 1;
  } else if (e.target.innerText == "Lets Go") {
    startPlay();
  }
});

function diplayPlayerCard() {
  //- if counter (which start from 0 and increament every dispaly calling) bigger than numOfPlayer just stop display cards
  // and lets play
  // if (counter > numofPlayers)  return;

  // if this the last card lets show 'Lets Go' for user
  //! todo use data- better
  let btnText = counter == numofPlayers ? "Lets Go" : "Next Player";

  // playerCard.innerHTML = `<p class="fs-3 text-center text-uppercase">Player No. ${counter}</p>
  // <p class="fs-3 text-center text-uppercase">scratch the card</p>
  // <div id="scratch" class="scratch bg-primary bg-dark d-flex  rounded-3 mb-3">
  //  <div class="p-3 d-flex gap-5 align-items-center">
  //   <p class="display-1 logo-font">${counter == spyNum ? "SPY" : "ALEX"} </p>
  //   <i class="fa-solid ${
  //     counter == spyNum ? "fa-user-secret fa-10x" : "fa-location-dot fa-8x"
  //   }   text-red"></i>
  //  </div>
  // </div>

  // <button class="primary-btn d-block mx-auto" id="next">${btnText}</button>`;

  playerCard.innerHTML = `
  <div class="playCrad text-center">
  <p class="fs-3 text-center text-uppercase">Player No. <span class="fw-bolder text-white text-opacity-75">${counter}</span></p>
  <p class="fs-3 text-center text-uppercase">Flip the card</p>
  <div class="contentParent">
  <div class="content mb-5">
    <div class="bg-dark rounded-3 position-absolute h-100 w-100 front display-3 d-flex align-items-center justify-content-center">
      Flip It
    </div>
    <div class="back position-absolute h-100 w-100">

      <div class="bg-dark d-flex rounded-3 h-100 w-100 rounded-3">
        <div class="p-3 d-flex gap-5 w-100 align-items-center justify-content-between">
          <p class="display-1 logo-font">${
            counter == spyNum ? "SPY" : "ALEX"
          } </p>
          <i class="fa-solid ${
            counter == spyNum
              ? " fa-user-secret fa-10x"
              : "fa-location-dot fa-8x"
          } text-red"></i>
        </div>
      </div>
      </div>

    </div>
  </div>
  <button class="primary-btn d-block mx-auto" id="next">${btnText}</button>

</div>


  
  `;
}

function makeScratchCard() {
  $("#scratch").wScratchPad({
    size: 10,
    fg: "#fff",
    scratchMove: function (e, percent) {
      if (percent >= 15) {
        $("#scratch").wScratchPad("clear");
      }
    },
  });
}

let spyNum = -1;
$("#playIcon").click(() => {
  $("#settings").fadeOut(fadeTime, () => {
    startShowCards();
  });
});
function startShowCards() {
  //- generate random num for spy card
  spyNum = generateRandomNoOver(numofPlayers);
  //- start diaply first card
  diplayPlayerCard();
  counter += 1;
  //- fadeIn the parent of cards
  $("#cards").fadeIn(fadeTime * 0, () => {
    // makeScratchCard();
  });
}
function generateRandomNoOver(num) {
  return Math.ceil(Math.random() * num);
}

// **************************************** timePgae
let countdownInterval;
function startPlay() {
  $("#cards").fadeOut(fadeTime, () => {
    $("#timeCrad").fadeIn(fadeTime);

    time *= 60;

    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
  });
}

// countDown
function updateCountdown() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  let tektok = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  showTime.innerText = tektok;
  if (time > 0) {
    time--;
  } else {
    stopPLay();
  }
}

function stopPLay() {
  clearInterval(countdownInterval);
  $("#timeCrad").fadeOut(fadeTime, () => {
    spyPlayerEl.innerText = spyNum;
    $("#loading")
      .fadeIn(fadeTime)
      .fadeOut(fadeTime * 3, () => {
        $("#welocomePage").fadeIn(fadeTime);
      });
  });

  resetTheGame();
}

$("#stop").click(() => {
  stopPLay();
});

function resetTheGame() {
  numofPlayers = 3;
  time = 5;
  counter = 1;
  setTime();
  setNumOfPlayers();
}

// typing
let avatars = document.querySelectorAll("[data-text]");
// let alfaroukText = document.getElementById("alfaroukText");
avatars.forEach((avatar) => {
  avatar.addEventListener("mouseenter", (e) => {
    avatar.style.setProperty("--circle-width", "100%");
    const arrow = avatar.querySelector("i");
    arrow.style.rotate = "0deg";
    typingName(
      avatar.querySelector(".mentorName"),
      avatar.dataset.text,
      arrow,
      avatar
    );
  });
});

function typingName(element, string, arrow, avatar) {
  const typed = new Typed(element, {
    strings: [string],
    typeSpeed: 40,
    showCursor: false,
    onComplete: (self) => {
      setTimeout(() => {
        deleteTextSmothing(self, element.innerText.length, arrow, avatar);
      }, fadeTime);
    },
  });
}

function deleteTextSmothing(type, currentIndex, arrow, avatar) {
  if (currentIndex >= 0) {
    arrow.style.rotate = "90deg";
    const newText = type.el.textContent.slice(0, currentIndex);
    type.el.textContent = newText;
    setTimeout(() => {
      deleteTextSmothing(type, currentIndex - 1, arrow, avatar);
    }, fadeTime / 10);
  } else {
    avatar.style.setProperty("--circle-width", "45px");
    type.destroy();
  }
}

let navBar = document.getElementById("navBar");
window.addEventListener("scroll", () => {
  window.scrollY > 20
    ? (navBar.style.backgroundColor = "rgba(221, 24, 24 , .8)")
    : (navBar.style.backgroundColor = "transparent");
});
