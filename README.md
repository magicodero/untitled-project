# 🏰 Unser Browsergame Projekt

Willkommen im Team! Hier entsteht unser klassisches Strategie-Aufbauspiel.
Diese Anleitung hilft dir, die Entwicklungsumgebung auf deinem PC einzurichten.

## 🛠 Technologien
Wir nutzen einen klassischen, einsteigerfreundlichen Stack:
*   **Backend:** Node.js & Express
*   **Frontend:** EJS (HTML Templates) & Vanilla JS
*   **Styling:** SCSS (Sass)
*   **Datenbank:** SQLite (Lokal)

---

## 🚀 Einrichtung (Setup)

### 1. Voraussetzungen installieren
Bevor du startest, brauchst du folgende Programme:
*   **Node.js:** [Hier herunterladen](https://nodejs.org/) (Nimm die "LTS"-Version).
*   **Git:** [Hier herunterladen](https://git-scm.com/).
*   **Editor:** Wir empfehlen [VS Code](https://code.visualstudio.com/).

### 2. Projekt herunterladen
Öffne dein Terminal (oder Git Bash) und führe folgende Befehle aus:

```bash
# Repo klonen (ersetze URL mit unserer Repo-URL)
git clone https://github.com/DEIN-USER/DEIN-REPO.git

# In den Ordner gehen
cd dein-projekt-name
```

### 3. Abhängigkeiten installieren
Damit das Spiel läuft, müssen wir erst die Bibliotheken laden:

```bash
npm install
```
*(Das dauert kurz, hol dir einen Kaffee ☕)*

### 4. Spiel starten
Wir haben einen speziellen Befehl, der **Server** und **CSS-Kompilierung** gleichzeitig startet:

```bash
npm run dev
```

Wenn du `[SRV] Server läuft auf http://localhost:3000` siehst, hat es geklappt!
👉 Öffne jetzt deinen Browser und geh auf: **http://localhost:3000**

---

## 🤝 Wie wir zusammenarbeiten (Git Workflow)

Damit wir uns nicht gegenseitig den Code kaputt machen, gelten folgende Regeln:

1.  🔴 **NIEMALS direkt auf `main` pushen!**
    Der `main`-Branch ist heilig. Dort liegt nur Code, der funktioniert.

2.  🟢 **Nutze Feature-Branches**
    Für jede Aufgabe erstellst du einen eigenen Branch:
    ```bash
    # Neuen Branch erstellen (z.B. für eine neue Mine)
    git checkout -b feature/eisenmine
    ```

3.  🔵 **Pull Requests (PR)**
    Wenn du fertig bist:
    1.  `git add .` und `git commit -m "Mein Update"`
    2.  `git push -u origin feature/eisenmine`
    3.  Geh auf GitHub und erstelle einen **Pull Request**.
    4.  Warte auf das "Okay" (Review) vom Team-Lead.

---

## 📂 Wichtige Ordner

*   `server.js` - Hier startet das Backend & die API.
*   `views/` - Hier liegen die HTML-Vorlagen (.ejs).
*   `scss/` - Hier schreiben wir das Design (.scss).
*   `public/js/` - Hier liegt das Javascript für den Browser (Klick-Events etc.).
*   `database/` - Hier wird automatisch die `game.db` erstellt.

---

**Viel Spaß beim Coden!** 🚀