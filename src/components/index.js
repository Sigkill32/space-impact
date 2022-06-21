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

function bullet(ctx, x, y) {
  ctx.beginPath();
  ctx.rect(x, y, 2, 10);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}

function renderAllChars(ctx, coordinates) {
  const myShip = ship(ctx, SHIP_WIDTH, SHIP_HEIGHT);
  const enemyShip = ship(ctx, 20, 10);
  myShip(coordinates.myShip.x, coordinates.myShip.y);
  const allEnemyShips = Object.keys(coordinates.enemyShips);
  if (allEnemyShips.length > 0) {
    allEnemyShips.forEach((enemyShipId) => {
      enemyShip(
        coordinates.enemyShips[enemyShipId].x,
        coordinates.enemyShips[enemyShipId].y
      );
    });
  }
  const allBullets = Object.keys(coordinates.bullets);
  if (allBullets.length > 0) {
    allBullets.forEach((bulletId) => {
      bullet(
        ctx,
        coordinates.bullets[bulletId].x,
        coordinates.bullets[bulletId].y
      );
    });
  }
}

export default renderAllChars;
