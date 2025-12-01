const path = require('path');
const selfsigned = require('selfsigned');
const fs = require('fs-extra');

// Funktion zum Abrufen oder Generieren der SSL-Zertifikate
const keyPath = path.join(__dirname,"../certs", 'key.pem');
const certPath = path.join(__dirname,"../certs", 'cert.pem');

function getCertificates() {
  fs.ensureDirSync(path.join(__dirname,"../certs"));
  // Prüfen, ob die Zertifikatsdateien bereits existieren
  if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
    console.log('Vorhandene SSL-Zertifikate werden verwendet.');
    return {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    };
  }

  // Wenn nicht, neue Zertifikate generieren
  console.log('Generiere neue SSL-Zertifikate...');
  
  // Attribute für das Zertifikat (CN=localhost ist wichtig)
  const attrs = [{ name: 'commonName', value: 'localhost' }];
  
  // Optionen für das Zertifikat
  const pems = selfsigned.generate(attrs, {
    keySize: 2048, // RSA key size
    days: 365,     // Gültigkeit in Tagen
    algorithm: 'sha256', // Signaturalgorithmus
  });

  // Die neuen Zertifikatsdateien synchron schreiben
  fs.writeFileSync(keyPath, pems.private);
  fs.writeFileSync(certPath, pems.cert);
  
  console.log('Neue SSL-Zertifikate erfolgreich erstellt und gespeichert.');

  return {
    key: pems.private,
    cert: pems.cert,
  };
}

module.exports = {
  getCertificates
}