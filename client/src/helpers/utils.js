function normalize(championName) {
  return championName
    .replace(/[^a-zA-Z]/g, "")
    .toLowerCase()
    .trim();
}

export { normalize };
