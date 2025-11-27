const express = require('express');
const app = express();
const db = require('./database');
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    db.get("SELECT * FROM players WHERE id = 1", (err, row) => {
        if (err) return res.send("DB Fehler");
        res.render('index', { player: row }); 
    });
});

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

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
