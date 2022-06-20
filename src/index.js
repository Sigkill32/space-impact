import { SHIP_WIDTH, SHIP_HEIGHT } from "./constants";
import renderAllChars from "./components";

const canvas = document.getElementById("gameCanvas");
const documentHeight = document.body.clientHeight;
const documentWidth = document.body.clientWidth;

canvas.setAttribute("width", documentWidth);
canvas.setAttribute("height", Math.floor(documentHeight * 0.75));
const ctx = canvas.getContext("2d");

const MAX_WIDTH = canvas.clientWidth;
const MAX_HEIGHT = canvas.clientHeight;

const coordinates = {
  myShip: {
    x: Math.floor(MAX_WIDTH / 2),
    y: MAX_HEIGHT - SHIP_WIDTH,
  },
  enemyShip: {
    x: MAX_WIDTH + 5, // keep the ship away from users view
    y: 0,
  },
  bullet: {
    x: Math.floor(MAX_WIDTH / 2),
    y: MAX_HEIGHT - SHIP_WIDTH,
  },
};

renderAllChars(ctx, coordinates);
