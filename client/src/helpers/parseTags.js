export function parseTags(str, prefix = "@") {
  return str
    .split(" ")
    .filter((word) => word.startsWith(prefix))
    .map((tag) => tag.replace(/[^A-Za-z0-9_]/g, ""));
}

export function parseTagsV2(notes) {
  return [
    ...new Set(
      notes
        .map((note) => note.tags.split(","))
        .flatMap((note) => note)
        .filter((item) => item)
    ),
  ];
}
