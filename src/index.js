import { SHIP_WIDTH, SHIP_HEIGHT, CANVAS_PADDING } from "./constants";
import renderAllChars from "./components";
import Observer from "./Observer";
import { isMobile, uuid } from "./utils";

const IS_MOBILE = isMobile();

const canvas = document.getElementById("gameCanvas");
const shoot = document.querySelector(".SpaceImpact_Shoot");
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
  enemyShip: {
    x: MAX_WIDTH + 5, // extra 5 to keep the ship away from users view
    y: 0,
  },
  bullets: {},
};

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
    x: coordinates.myShip.x,
    y: coordinates.myShip.y,
  };
  paintScreen();
  shootBullet(newBullet);
}

shoot.addEventListener("click", createAndShootBullets);

function triggerEnemyShips() {
  coordinates.enemyShip.x -= 1;
  paintScreen();
  if (coordinates.enemyShip.x >= 0) requestAnimationFrame(triggerEnemyShips);
  else {
    coordinates.enemyShip.x = MAX_WIDTH + 5;
    triggerEnemyShips();
  }
}

triggerEnemyShips();
