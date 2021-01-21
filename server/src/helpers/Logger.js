const fs = require('fs');
const path = require('path');

class Logger {
  static debug = true;

  static toJson(data, fileName = 'data.json') {
    if (!debug) return;
    fs.writeFileSync(path.resolve(__dirname, fileName), JSON.stringify(data));
    Logger._log('File written');
  }

  static _log(message) {
    if (!debug) return;
    console.log(message);
  }
}

module.exports = Logger;
