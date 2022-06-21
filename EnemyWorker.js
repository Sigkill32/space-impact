let timer = null;

function mobilizeEnemy() {
  timer = setInterval(() => {
    postMessage(JSON.stringify({ message: "MOBILIZE_ENEMY", data: null }));
  }, 500);
}

self.onmessage = function (event) {
  const { data: eventData } = event;
  const { message, data } = JSON.parse(eventData);
  switch (message) {
    case "START_GAME":
      mobilizeEnemy();
      break;
    case "STOP_GAME":
      clearInterval(timer);
      postMessage(JSON.stringify({ message: "END_GAME", data: null }));
      break;
    default:
      clearInterval(timer);
      break;
  }
};
