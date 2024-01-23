// const path = require('path');
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./src/config.db');
// let db = new sqlite3.Database(path.resolve(__dirname, './src/config.db'));
// create a table and insert a row
// db.serialize(() => {
//   db.run("DROP TABLE IF EXISTS BotCreds");
//   db.run("CREATE TABLE BotCreds (botName, host, streamId, jwt)");
//   const bots = [
//     ['bot-name', 'host-url', 'bot-id', 'bot-jwt-token']
//   ];
//   let query = db.prepare("INSERT INTO BotCreds VALUES (?, ?, ?, ?)");
//   // run the query over and over for each inner array
//   for (var i = 0; i < bots.length; i++) {
//     query.run(bots[i], function (err) {
//       if (err) throw err;
//     });
//   }
//   query.finalize();
// });

const getBots = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT botName FROM BotCreds', (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

const getBotConfig = (botName) => {
  return new Promise((resolve, reject) => {
    let query = db.prepare(`SELECT * FROM BotCreds WHERE botName = ?`, [botName]);
    query.all((err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows[0]);
    });
  });
}

module.exports = {
  getBots,
  getBotConfig
}