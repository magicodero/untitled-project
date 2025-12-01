const express = require('express');
const app = express();
const db = require('./database');
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.json());

const selectPlayerId1 = db.prepare('SELECT * FROM players WHERE id = ?');

app.get('/', (req, res) => {
    //Since we dont have a login right now, we just get player with id 1
    selectPlayerId1.run(1);
    const playerId1 = getPlayerResources.get(1);

    res.render('index', { player: playerId1 }); 
});

const updatePlayerStein = db.prepare('UPDATE players SET stein = stein + 10 WHERE id = ?');
const updatePlayerHolz = db.prepare('UPDATE players SET holz = holz + 10 WHERE id = ?');
const getPlayerResources = db.prepare('SELECT holz, stein FROM players WHERE id = ?');

app.post('/api/hacken', (req, res) => {
    const userId = 1; 
    try {
        // 4. Die bereits vorbereiteten Statements einfach nur noch ausführen (.run, .get, .all)
        updatePlayerHolz.run(userId);
        const neueWerte = getPlayerResources.get(userId);

        res.json({ success: true, neueWerte: neueWerte });

    } catch (err) {
        console.error("DB Fehler:", err.message);
        res.status(500).json({ success: false, error: "DB Fehler" });
    }
});

//neu
app.post('/api/steinbrechen', (req, res) => {
    const userId = 1; 
    try {
        // 4. Die bereits vorbereiteten Statements einfach nur noch ausführen (.run, .get, .all)
        updatePlayerStein.run(userId);
        const neueWerte = getPlayerResources.get(userId);

        res.json({ success: true, neueWerte: neueWerte });

    } catch (err) {
        console.error("DB Fehler:", err.message);
        res.status(500).json({ success: false, error: "DB Fehler" });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
