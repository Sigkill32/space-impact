import { SHIP_WIDTH, SHIP_HEIGHT } from "./constants";
import renderAllChars from "./components";

const canvas = document.getElementById("gameCanvas");
const documentHeight = window.innerHeight;
const documentWidth = window.innerWidth;

canvas.setAttribute("width", documentWidth - 50);
canvas.setAttribute("height", Math.floor(documentHeight * 0.8));
const ctx = canvas.getContext("2d");

const MAX_WIDTH = canvas.width;
const MAX_HEIGHT = canvas.height;

console.log({ MAX_WIDTH, MAX_HEIGHT, documentHeight, documentWidth });
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

renderAllChars(ctx, coordinates);

function handleMove(e) {
  console.log(e.clientX);
}

document.addEventListener("mousemove", handleMove);
