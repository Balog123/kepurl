const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// MySQL kapcsolat beállítása
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '', // A MySQL jelszója
  database: 'butorbolt',
});

connection.connect((err) => {
  if (err) {
    console.error('MySQL kapcsolódási hiba: ' + err.stack);
    return;
  }
  console.log('MySQL kapcsolódva az ID ' + connection.threadId);
});

// Regisztráció oldal megjelenítése
app.get('/regisztracio', (req, res) => {
  res.sendFile(__dirname + '/regisztracio.html'); // A regisztrációs űrlap html fájlja
});

// Bejelentkezés oldal megjelenítése
app.get('/bejelentkezes', (req, res) => {
  res.sendFile(__dirname + '/bejelentkezes.html');
});

//Termek
app.get('/termek', (req, res) => {
  res.sendFile(__dirname + '/termek.html');
});

// Regisztráció adatok kezelése
app.post('/regisztracio', (req, res) => {
  const felhasznalo = {
    felhasznalo_email: req.body.email,
    felhasznalo_jelszo: req.body.jelszo,
    felhasznalo_keresztnev: req.body.keresztnev,
    felhasznalo_vezeteknev: req.body.vezeteknev,
    felhasznalo_varos: req.body.varos,
    felhasznalo_iranyitoszam: req.body.iranyitoszam,
    felhasznalo_cim1: req.body.cim1,
    felhasznalo_cim2: req.body.cim2,
  };

  connection.query('INSERT INTO Felhasznalo SET ?', felhasznalo, (error, results, fields) => {
    if (error) {
      console.error('MySQL hiba a regisztráció során: ' + error.stack);
      res.status(500).send('Hiba a regisztráció során.');
      return;
    }

    console.log('Sikeres regisztráció, felhasználó ID: ' + results.insertId);
    res.send('Sikeres regisztráció!');
  });
});

// Bejelentkezés adatok kezelése
app.post('/bejelentkezes', (req, res) => {
  const { email, jelszo } = req.body;

  connection.query('SELECT * FROM Felhasznalo WHERE felhasznalo_email = ? AND felhasznalo_jelszo = ?', [email, jelszo], (error, results, fields) => {
    if (error) {
      console.error('MySQL hiba a bejelentkezés során: ' + error.stack);
      res.status(500).send('Hiba a bejelentkezés során.');
      return;
    }

    if (results.length > 0) {
      // Sikeres bejelentkezés, átirányítás egy másik oldalra
      res.redirect('/sikeres-bejelentkezes');
    } else {
      // Sikertelen bejelentkezés
      res.send('Sikertelen bejelentkezés. Ellenőrizd az e-mail címet és a jelszót.');
    }
  });
});

// Sikeres bejelentkezés oldal
app.get('/sikeres-bejelentkezes', (req, res) => {
  res.send('Sikeres bejelentkezés! Üdvözöllek!');
});




app.listen(port, () => {
  console.log(`A szerver fut a http://localhost:${port} címen.`);
});
