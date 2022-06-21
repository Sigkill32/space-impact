import {
  SHIP_WIDTH,
  SHIP_HEIGHT,
  CANVAS_PADDING,
  GAME_STATE_TOGGLE,
} from "./constants";
import renderAllChars from "./components";
import Observer from "./Observer";
import { getRandomNum, isMobile, uuid } from "./utils";

const IS_MOBILE = isMobile();
const worker = new Worker("BulletsWorks.js");
const canvas = document.getElementById("gameCanvas");
const gameToggle = document.querySelector(".SpaceImpact_GameToggle");
const documentHeight = window.innerHeight;
const documentWidth = window.innerWidth;

canvas.setAttribute("width", documentWidth - CANVAS_PADDING);
canvas.setAttribute("height", Math.floor(documentHeight * 0.8));
const ctx = canvas.getContext("2d");

const MAX_WIDTH = canvas.width;
const MAX_HEIGHT = canvas.height;

const observer = new Observer();

/* -------------------------------variables---------------------------------------*/

const coordinates = {
  myShip: {
    x: Math.floor(MAX_WIDTH / 2),
    y: MAX_HEIGHT - SHIP_WIDTH * 2,
  },
  enemyShips: {},
  bullets: {},
};

let gameState = "STOP_GAME";

/* ------------------------------------------------------------------------------*/

renderAllChars(ctx, coordinates);

function paintScreen() {
  ctx.clearRect(0, 0, MAX_WIDTH, MAX_HEIGHT);
  renderAllChars(ctx, coordinates);
}

function steerShip(e) {
  let { clientX } = e;
  if (IS_MOBILE) {
    clientX = e.changedTouches[0].clientX;
  }
  coordinates.myShip.x = clientX - CANVAS_PADDING / 2;
  paintScreen();
}

function handleShipMotionActivation(e) {
  let { type, clientX } = e;
  if (IS_MOBILE) {
    clientX = e.changedTouches[0].clientX;
  }
  if (type === "mousedown" || type === "touchstart") {
    coordinates.myShip.x = clientX - CANVAS_PADDING / 2;
    paintScreen();
    canvas.addEventListener(IS_MOBILE ? "touchmove" : "mousemove", steerShip);
  }
  if (type === "mouseup" || type === "touchend") {
    canvas.removeEventListener(
      IS_MOBILE ? "touchmove" : "mousemove",
      steerShip
    );
  }
}

canvas.addEventListener(
  IS_MOBILE ? "touchstart" : "mousedown",
  handleShipMotionActivation
);
canvas.addEventListener(
  IS_MOBILE ? "touchend" : "mouseup",
  handleShipMotionActivation
);

function shootBullet(bulletId) {
  coordinates.bullets[bulletId].y -= 5;
  paintScreen();
  if (coordinates.bullets[bulletId].y >= 0) {
    requestAnimationFrame(() => shootBullet(bulletId));
  } else {
    delete coordinates.bullets[bulletId];
    paintScreen();
  }
}

function createAndShootBullets() {
  const newBullet = uuid();
  coordinates.bullets[newBullet] = {
    x: coordinates.myShip.x + SHIP_WIDTH / 2,
    y: coordinates.myShip.y,
  };
  paintScreen();
  shootBullet(newBullet);
}

function triggerEnemyShips(enemyShipId) {
  coordinates.enemyShips[enemyShipId].y += 3;
  paintScreen();
  if (coordinates.enemyShips[enemyShipId].y <= MAX_HEIGHT) {
    requestAnimationFrame(() => triggerEnemyShips(enemyShipId));
  } else {
    delete coordinates.enemyShips[enemyShipId];
    paintScreen();
  }
}

function createAndTriggerEnemyShips() {
  const newEnemyShip = uuid();
  const x = getRandomNum(0, MAX_WIDTH);
  coordinates.enemyShips[newEnemyShip] = {
    x: x,
    y: 0,
  };
  paintScreen();
  triggerEnemyShips(newEnemyShip);
}

worker.onmessage = function (event) {
  const { data } = event;
  switch (data) {
    case "SHOOT_BULLET":
      createAndShootBullets();
      createAndTriggerEnemyShips();
      break;
    case "END_GAME":
      console.log("game ended");
      break;
  }
};

gameToggle.addEventListener("click", () => {
  if (gameState === "START_GAME") {
    gameState = "STOP_GAME";
  } else {
    gameState = "START_GAME";
  }
  worker.postMessage(gameState);
  gameToggle.textContent = GAME_STATE_TOGGLE[gameState];
});

// startGame();
