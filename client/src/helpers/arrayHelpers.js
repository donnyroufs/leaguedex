export function arraysEqual(_a, _b) {
  if (!Array.isArray(_a) || !Array.isArray(_b) || _a.length !== _b.length) {
    return false;
  }

  const a = _a.concat().sort();
  const b = _b.concat().sort();

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }

  return true;
}

export function filterByTags(_a, _b) {
  return _a.filter((note) => {
    const noteTags = note.tags.split(",");
    return _b.every((tag) => noteTags.includes(tag));
  });
}
