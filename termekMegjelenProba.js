const express = require('express')
const mysql = require('mysql2')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'butorbolt'
})

db.connect((err) => {
  if (err) {
    console.error("MySQL kapcsolódási hiba: " + err.stack)
    return;
  }
})

app.get('/sql', (req, res) => {
    const termekSql = `SELECT * FROM Termek
                    INNER JOIN Kep ON Termek.termek_id = Kep.kep_id;`

    db.query(termekSql, (err, results) => {
        if (err) {
            console.error('Error executing SQL qurey:', err)
            return
        }

        console.log('Query results:', results)

        const termekData = results;

        function generateHTML(termekData) {
            let html = '<!DOCTYPE html><html><head><title>Termékek</title></head><body>';
        
            // Iteráljunk végig az adatokon, és minden termékhez hozzunk létre egy div elemet
            termekData.forEach(termek => {
                html += `<div style="border: 1px solid #ccc; padding: 10px; margin: 10px;">
                            <h2>${termek.termek_nev}</h2>
                            <p>${termek.termek_leiras}</p>
                            <img src="${termek.kep_url1}" alt="">
                        </div>`;
            });
        
            html += '</body></html>';
        
            return html;
        }
        res.send(generateHTML(termekData))

        db.end((err) => {
            if (err) {
                console.error('Error closing MYSQL connection:', err)
            }
            console.log('MYSQL connection closed')
        })
    })
})



app.listen(port, () => {
  console.log(`A szerver fut a http://localhost:${port} címen.`)
})