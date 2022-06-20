import { SHIP_WIDTH, SHIP_HEIGHT, CANVAS_PADDING } from "./constants";
import renderAllChars from "./components";
import Observer from "./Observer";
import { isMobile } from "./utils";

const IS_MOBILE = isMobile();

const canvas = document.getElementById("gameCanvas");
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
  bullet: {
    x: MAX_WIDTH / 2,
    y: MAX_HEIGHT - SHIP_WIDTH,
  },
};

/* ------------------------------------------------------------------------------*/

renderAllChars(ctx, coordinates);

function steerShip(e) {
  let { clientX } = e;
  if (IS_MOBILE) {
    clientX = e.changedTouches[0].clientX;
  }
  coordinates.myShip.x = clientX - CANVAS_PADDING / 2;
  ctx.clearRect(0, 0, MAX_WIDTH, MAX_HEIGHT);
  renderAllChars(ctx, coordinates);
}

function handleShipMotionActivation(e) {
  let { type, clientX } = e;
  if (IS_MOBILE) {
    clientX = e.changedTouches[0].clientX;
  }
  if (type === "mousedown" || type === "touchstart") {
    coordinates.myShip.x = clientX - CANVAS_PADDING / 2;
    ctx.clearRect(0, 0, MAX_WIDTH, MAX_HEIGHT);
    renderAllChars(ctx, coordinates);
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
