function formatTime(startTime) {
  const minutes = Math.floor(startTime / 60000);
  const seconds = ((startTime % 60000) / 1000).toFixed(0);
  const formatted = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  return { minutes, formatted };
}

const calculateGameTime = (startTime) => Date.now() - startTime;

export { calculateGameTime, formatTime };
