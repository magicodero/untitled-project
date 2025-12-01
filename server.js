const https = require('https');
const express = require('express');
const app = express();
const db = require('./database');
const path = require('path');
const session = require('express-session');
const { getCertificates } = require('./src/ssl');

const sslOptions = getCertificates();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.json());

app.use(session({
  // Dies ist der "Secret", der zum Signieren des Session-ID-Cookies verwendet wird.
  // Er sollte eine lange, zufällige Zeichenkette sein.
  secret: '12BananeAlterScwhedeDasIstEinGeheimnisoderSo!', // TODO: Muss später in die .env statt hier.

  // Diese Optionen sind für die meisten Setups empfohlen:
  resave: false,
  saveUninitialized: true,

  cookie: {
    // Für die lokale HTTP-Entwicklung `secure` auf `false` setzen!
    secure: false,
    httpOnly: true, // Verhindert, dass das Cookie per JS ausgelesen wird (Schutz vor XSS)
    maxAge: 1000 * 60 * 60 * 6 // 6 Stunden Gültigkeit
  }
}));

app.post('/login', (req, res) => {
  // In einer echten App würden Sie hier Benutzername/Passwort prüfen.
  // Hier setzen wir einfach die Session-Daten.
  req.session.userId = 'user123';
  req.session.loggedIn = true;
  res.send('Erfolgreich eingeloggt! Session gestartet.');
});

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

//neu
app.post('/api/steinbrechen', (req, res) => {
    const userId = 1;
    db.run("UPDATE players set stein = stein + 10 WHERE ID = ?", [userID], function(err){
        if(err) return res.json({sucess: false});
        db.get("SELECT holz, stein FROM players WHERE id = ?",[userId], (err, row) => {
            res.json({sucess: true, neuewWerte: row});
        });
    });
});

const PORT = 3000;

https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`Server läuft sicher auf https://localhost:${PORT}`);
  console.log('Falls dies das erste Mal ist, importiere die neu erstellte "cert.pem" in deinen Browser.');
});