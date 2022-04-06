
CREATE TABLE opilased (
    opilase_id int(6) PRIMARY KEY AUTO_INCREMENT,
    opilase_nimi VARCHAR(255) NOT NULL,
    klass VARCHAR(255) NOT NULL,
    kooli_id int(255)
);

CREATE TABLE ained (
    aine_id int(6) NOT NULL PRIMARY KEY,
    aine_nimi VARCHAR(255)
);
INSERT INTO ained VALUES (1, "Matemaatika");
INSERT INTO ained VALUES (2, "Eesti keel");
INSERT INTO ained VALUES (3, "Inglise keel");
INSERT INTO ained VALUES (4, "Muusika");
INSERT INTO ained VALUES (5, "Kunst");
INSERT INTO ained VALUES (6, "Ajalugu");
INSERT INTO ained VALUES (7, "Keemia");
INSERT INTO ained VALUES (8, "Bioloogia");
INSERT INTO ained VALUES (9, "Geograafia");
INSERT INTO ained VALUES (10, "Kirjandus");


CREATE TABLE opetaja (
    opetaja_id INT(6) PRIMARY KEY AUTO_INCREMENT,
    opetaja_nimi VARCHAR(255)
);

CREATE TABLE opetatavad_ained(
    aine_nimi int(6),
    o_klass VARCHAR(255),
    aine_opetaja VARCHAR(255)
);

CREATE TABLE opil_kasutajad (
    kasutaja_id int(6),
    kasutajanimi VARCHAR(255),
    parool VARCHAR(255),
    FOREIGN KEY (kasutaja_id) REFERENCES opilased(opilase_id)
);

CREATE TABLE opet_kasutajad (
    kasutaja_id int(6),
    kasutajanimi VARCHAR(255),
    parool VARCHAR(255),
    FOREIGN KEY (kasutaja_id) REFERENCES opetaja(opetaja_id)
);

CREATE TABLE hinded (
    opilase_id int(6),
    aine_id int(6),
    hinne int(1) NOT NULL,
    kommentaar VARCHAR(255),
    FOREIGN KEY (opilase_id) REFERENCES opilased(opilase_id),
    FOREIGN KEY (aine_id) REFERENCES ained(aine_id)

);


CREATE TABLE kypsised (

)


