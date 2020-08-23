export function parseTags(str, prefix = "@") {
  return str
    .split(" ")
    .filter((word) => word.startsWith(prefix))
    .map((tag) => tag.replace(/[^A-Za-z0-9]/g, ""));
}
