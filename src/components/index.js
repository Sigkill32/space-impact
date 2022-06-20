import { SHIP_HEIGHT, SHIP_WIDTH } from "../constants";

function ship(ctx, width, height) {
  return function (x, y) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
  };
}

function bullet(ctx, width, height) {
  return function (x, y) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
  };
}

function renderAllChars(ctx, coordinates) {
  const myShip = ship(ctx, SHIP_WIDTH, SHIP_HEIGHT);
  const enemyShip = ship(ctx, 20, 10);
  myShip(coordinates.myShip.x, coordinates.myShip.y);
  enemyShip(coordinates.enemyShip.x, coordinates.enemyShip.y);
  bullet(ctx, coordinates.bullet.x, coordinates.bullet.y);
}

export default renderAllChars;
