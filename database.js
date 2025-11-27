const sqlite3 = require('better-sqlite3');
const path = require('path');
const fss = require('fs-extra');
fss.ensureDir("database")
const dbPath = path.resolve(__dirname, 'database', 'game.db');
const db = new sqlite3(dbPath);
db.pragma('journal_mode = WAL');


const stmt = db.prepare(`
  CREATE TABLE IF NOT EXISTS players (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    holz INTEGER DEFAULT 0,
    stein INTEGER DEFAULT 0
  )
`);
const info = stmt.run();

console.log(info.changes == 1 ? "Datenbank: Tabelle 'players' wurde angelegt!" : "Datenbank: Tabelle 'players' existiert bereits.");

// Prepare your statements once, ideally after you connect to the database.
const getPlayerById = db.prepare('SELECT * FROM players WHERE id = ?');
const insertPlayer = db.prepare('INSERT INTO players (name, holz, stein) VALUES (?, ?, ?)');

// --- Later in your code, you can just execute them ---

function ensureTestPlayerExists() {
  const player = getPlayerById.get(1); // Simply execute the prepared statement

  if (!player) {
    // The statement is already prepared, just run it with new data
    const info = insertPlayer.run('Spieler 1', 100, 50);
    
    // .run() returns an info object, e.g., { changes: 1, lastInsertRowid: ... }
    if (info.changes > 0) {
      console.log("Datenbank: Test-Spieler wurde angelegt!");
    }
  }
}

module.exports = db;
