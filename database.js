const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, 'database', 'game.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS players (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      holz INTEGER DEFAULT 0,
      stein INTEGER DEFAULT 0
    )
  `);
  db.get("SELECT * FROM players WHERE id = 1", (err, row) => {
    if (!row) {
      db.run("INSERT INTO players (name, holz, stein) VALUES ('Spieler 1', 100, 50)");
      console.log("Datenbank: Test-Spieler wurde angelegt!");
    }
  });
});
module.exports = db;
