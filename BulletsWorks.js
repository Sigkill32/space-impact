function startGame() {
  const timer = setInterval(() => {
    postMessage("SHOOT_BULLET");
  }, 100);
  return timer;
}

self.onmessage = function (event) {
  const { data } = event;
  let timer = null;
  if (data == "START_GAME") {
    timer = startGame();
  }
};
