let timer = null;

function startGame() {
  timer = setInterval(() => {
    postMessage("SHOOT_BULLET");
  }, 100);
}

self.onmessage = function (event) {
  const { data } = event;
  switch (data) {
    case "START_GAME":
      startGame();
      break;
    case "STOP_GAME":
      clearInterval(timer);
      postMessage("END_GAME");
      break;
    default:
      clearInterval(timer);
      break;
  }
};
