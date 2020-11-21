/* eslint-disable */

function normalize(championName) {
  return championName
    .replace(/[^a-zA-Z]/g, "")
    .toLowerCase()
    .trim();
}

function blackListEmail(email) {
  const regex = /[a-zA-Z0-9_\.+]+@(live|hotmail|outlook)/;
  return !!email.match(regex);
}

const removeNumbersFromString = (str) => str.replace(/[0-9]/g, "");

export { normalize, blackListEmail, removeNumbersFromString };
