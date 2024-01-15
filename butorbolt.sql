CREATE DATABASE butorbolt DEFAULT CHARACTER SET = 'utf8' COLLATE = 'utf8_hungarian_ci';

USE butorbolt;

CREATE TABLE Kep (
    kep_id INT(11) AUTO_INCREMENT PRIMARY KEY,
    kep_url1 VARCHAR(500),
    kep_url2 VARCHAR(500)
)

CREATE TABLE Kategoria (
    kategoria_id INT(11) AUTO_INCREMENT PRIMARY KEY,
    kategoria_nev VARCHAR(50)
)

CREATE TABLE Termek (
    termek_id INT(11) AUTO_INCREMENT PRIMARY KEY,
    termek_nev VARCHAR(100),
    termek_ar FLOAT,
    termek_leiras VARCHAR(500),
    termek_szelesseg INT(11),
    termek_magassag INT(11),
    termek_hossz INT(11),
    termek_kategoria_id INT(11),
    termek_raktaron INT(11),
    termek_kep_id INT(11),
    FOREIGN KEY (termek_kategoria_id) REFERENCES Kategoria(kategoria_id),
    FOREIGN KEY (termek_kep_id) REFERENCES Kep(kep_id)
)

CREATE TABLE Felhasznalo (
    felhasznalo_id INT(11) AUTO_INCREMENT PRIMARY KEY,
    felhasznalo_email VARCHAR(100),
    felhasznalo_jelszo VARCHAR(100),
    felhasznalo_keresztnev VARCHAR(50),
    felhasznalo_vezeteknev VARCHAR(50),
    felhasznalo_varos VARCHAR(100),
    felhasznalo_iranyitoszam VARCHAR(4),
    felhasznalo_cim1 VARCHAR(100),
    felhasznalo_cim2 VARCHAR(100) 
)

CREATE TABLE Rendeles (
    rendeles_id INT(11) AUTO_INCREMENT PRIMARY KEY,
    rendeles_felhasznalo_id INT(11),
    rendeles_szalitasi_keresztnev VARCHAR(50),
    rendeles_szalitasi_vezeteknev VARCHAR(50),
    rendeles_varos VARCHAR(50),
    rendeles_iranyitoszam VARCHAR(4),
    rendeles_cim VARCHAR(100),
    rendeles_emelet INT(11),
    rendeles_ajto INT(11),
    rendeles_datum TIMESTAMP,
    FOREIGN KEY (rendeles_felhasznalo_id) REFERENCES Felhasznalo(felhasznalo_id)
)

CREATE TABLE RendelesReszlet (
    reszlet_rendeles_id INT(11),
    reszlet_termek_id INT(11),
    reszlet_nev VARCHAR(100),
    reszlet_ar FLOAT,
    reszlet_darab INT(11),
    FOREIGN KEY (reszlet_rendeles_id) REFERENCES Rendeles(rendeles_id),
    FOREIGN KEY (reszlet_termek_id) REFERENCES Termek(termek_id)
)