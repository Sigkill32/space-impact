import { SHIP_WIDTH, SHIP_HEIGHT, CANVAS_PADDING } from "./constants";
import renderAllChars from "./components";
import Observer from "./Observer";

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
    y: MAX_HEIGHT - SHIP_WIDTH,
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
  const { clientX } = e;
}

function handleShipMotionActivation(e) {
  const { type, clientX } = e;
  if (type === "mousedown") {
    coordinates.myShip.x = clientX - CANVAS_PADDING / 2;
    renderAllChars(ctx, coordinates);
    canvas.addEventListener("mousemove", steerShip);
  }
  if (type === "mouseup") {
    canvas.removeEventListener("mousemove", steerShip);
  }
}

canvas.addEventListener("mousedown", handleShipMotionActivation);
canvas.addEventListener("mouseup", handleShipMotionActivation);
