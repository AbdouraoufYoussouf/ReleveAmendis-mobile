import * as SQLite from 'expo-sqlite';

import { ToastSuccess } from '../src/Components/Notifications';

const DatabaseConnection = {
  getConnection: () => SQLite.openDatabase("AmendisDatabase.db"),
};
const db = DatabaseConnection.getConnection();

export const createDatabase = () => {

  console.log('Debut de la creation de la base des données.');
  const p = new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        const onSuccess = () => {
          console.log(`Success`);
          ToastSuccess('La base des données est créer avec des données ajoutés !')

        };

        const onError = (tx, error) => {
          console.log(`Error`, { error });
          // throw Error("Statement failed.");
        };

        tx.executeSql(`PRAGMA foreign_keys = ON;`, [], onSuccess, onError);

        tx.executeSql(`DROP TABLE IF EXISTS terminal;`, [], onSuccess, onError);
        tx.executeSql(`CREATE TABLE IF NOT EXISTS terminal (terminalId INTEGER ,numeroTPL VARCHAR(10) PRIMARY KEY NOT NULL UNIQUE,rueEnLecture VARCHAR(100),isCreatec INTEGER);`, [], onSuccess, onError);

        tx.executeSql(`DROP TABLE IF EXISTS secteur;`, [], onSuccess, onError);
        tx.executeSql(`CREATE TABLE IF NOT EXISTS secteur (codeSecteur INTEGER PRIMARY KEY AUTOINCREMENT,designation VARCHAR(25) UNIQUE);`, [], onSuccess, onError);

        tx.executeSql(`DROP TABLE IF EXISTS rue;`, [], onSuccess, onError);
        tx.executeSql(`CREATE TABLE IF NOT EXISTS rue ( numeroRue INTEGER PRIMARY KEY AUTOINCREMENT,titreRue VARCHAR(15), nomRue TEXT UNIQUE);`, [], onSuccess, onError);

        tx.executeSql(`DROP TABLE IF EXISTS etat;`, [], onSuccess, onError);
        tx.executeSql(`CREATE TABLE IF NOT EXISTS etat (codeEtat VARCHAR(2) PRIMARY KEY NOT NULL UNIQUE,designation VARCHAR(50));`, [], onSuccess, onError);

        tx.executeSql(`DROP TABLE IF EXISTS tournee;`, [], onSuccess, onError);
        tx.executeSql(`CREATE TABLE IF NOT EXISTS tournee (numeroTourne VARCHAR(20) PRIMARY KEY NOT NULL UNIQUE, moisTourne VARCHAR(20), numeroTPL VARCHAR(10), userId INTEGER, FOREIGN KEY(numeroTPL) REFERENCES terminal(numeroTPL) ON DELETE CASCADE ON UPDATE CASCADE,FOREIGN KEY(userId) REFERENCES user(userId) ON DELETE SET NULL ON UPDATE CASCADE);`, [], onSuccess, onError);

        tx.executeSql(`DROP TABLE IF EXISTS fluide;`, [], onSuccess, onError);
        tx.executeSql(`CREATE TABLE IF NOT EXISTS fluide (codeFluide VARCHAR(2) PRIMARY KEY NOT NULL UNIQUE,designation VARCHAR(50), filtreSup INTEGER, filtreInf INTEGER,filtreMax INTEGER,filtreMin INTEGER);`, [], onSuccess, onError);

        tx.executeSql(`DROP TABLE IF EXISTS user;`, [], onSuccess, onError);
        tx.executeSql(`CREATE TABLE IF NOT EXISTS user ( userId INTEGER PRIMARY KEY AUTOINCREMENT, matricule VARCHAR(50) NOT NULL UNIQUE, nom VARCHAR(50),role VARCHAR(20));`, [], onSuccess, onError);

        tx.executeSql(`DROP TABLE IF EXISTS compte;`, [], onSuccess, onError);
        tx.executeSql(`CREATE TABLE IF NOT EXISTS compte (compteId INTEGER PRIMARY KEY AUTOINCREMENT,email VARCHAR(50) NOT NULL UNIQUE,password TEXT,userId INTEGER NOT NULL UNIQUE,FOREIGN KEY(userId) REFERENCES user(userId) ON DELETE CASCADE ON UPDATE CASCADE);`, [], onSuccess, onError);

        tx.executeSql(`DROP TABLE IF EXISTS anomalie;`, [], onSuccess, onError);
        tx.executeSql(`CREATE TABLE IF NOT EXISTS anomalie (codeAnomalie INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,designation VARCHAR(50),libele VARCHAR(5),
        codeFluide VARCHAR(20),
        anomalieId VARCHAR(20),
        FOREIGN KEY(codeFluide) REFERENCES fluide(codeFluide) ON DELETE SET NULL ON UPDATE CASCADE);`, [], onSuccess, onError);

        tx.executeSql(`DROP TABLE IF EXISTS compteur;`, [], onSuccess, onError);
        tx.executeSql(`CREATE TABLE IF NOT EXISTS compteur (
          compteurId INTEGER PRIMARY KEY AUTOINCREMENT,
          numeroCompteur VARCHAR(50) UNIQUE,
          idGeographique VARCHAR(10),
          nomAbonne VARCHAR(50),
         
          police VARCHAR(15),adresse TEXT,
          ancienIndex INTEGER,
          nouveauIndex INTEGER,
          etatLecture VARCHAR(2),
          codeEtat VARCHAR(2),
          consommation INTEGER,
          consMoyenne INTEGER, 
          dateReleve TEXT,
          heureReleve TEXT,
          nouveauIndex1 INTEGER,
          nouveauIndex2 INTEGER, 
          nouveauIndex3 INTEGER,
          nouveauIndex4 INTEGER, 
          nouveauIndex5 INTEGER,
          nouveauIndex6 INTEGER, 
          nouveauIndex7 INTEGER,
          codeFluide VARCHAR(20),
          numeroRue VARCHAR(4),
          codeSecteur VARCHAR(10),
          anomalie1 TEXT ,
          anomalie2 TEXT ,
          ordreRue VARCHAR(20) ,
          numeroTourne VARCHAR(20) ,
          
          FOREIGN KEY (numeroTourne) REFERENCES tournee(numeroTourne) ON DELETE SET NULL ON UPDATE CASCADE,
          FOREIGN KEY(codeFluide) REFERENCES fluide(codeFluide) ON DELETE SET NULL ON UPDATE CASCADE,
          FOREIGN KEY(numeroRue) REFERENCES rue(numeroRue) ON DELETE SET NULL ON UPDATE CASCADE,
          FOREIGN KEY(codeSecteur) REFERENCES secteur(codeSecteur) ON DELETE SET NULL ON UPDATE CASCADE);`, [], onSuccess, onError);

        // *********** INSERT SEED DATA ***************//
        tx.executeSql(`INSERT INTO terminal(terminalId,numeroTPL,isCreatec) VALUES(1,'TPL0',1);`, [], onSuccess, onError);
        tx.executeSql(`INSERT INTO user(matricule,nom,role) VALUES
          ('ABYO95','Abdouraouf Youssouf','Admin'),
          ('ABYO04','Abdolhalim Youssouf','Releveur'),
          ('ENYO02','Anfifedine Youssouf','Facturateur');`, [], onSuccess, onError);
        tx.executeSql(`INSERT INTO compte(email,password,userId) VALUES
          ('abdou@gmail.com','Abdou@2002',1),
          ('alhalim@gmail.com','Alhalim@2020',2),
          ('anfife@gmail.com','Anfife@2002',3);`, [], onSuccess, onError);
      },
      () => {
        console.log(`TX fail`);
        reject();
      },
      () => {
        console.log(`TX OK.`);
        console.log('Fin creation base des données.');
        resolve();
      }
    );


  });
  return p;
}


export const dropAllTables = () => {
  console.log("Debut de la suppression des tables.");
  const p = new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        const onSuccess = () => {
          console.log(`Success`);
        };

        const onError = (tx, error) => {
          console.log(`Error`, { error });
        };
        tx.executeSql(`DROP TABLE IF EXISTS terminal;`, [], onSuccess, onError);
        tx.executeSql(`DROP TABLE IF EXISTS secteur;`, [], onSuccess, onError);
        tx.executeSql(`DROP TABLE IF EXISTS rue;`, [], onSuccess, onError);
        tx.executeSql(`DROP TABLE IF EXISTS tournee;`, [], onSuccess, onError);
        tx.executeSql(`DROP TABLE IF EXISTS fluide;`, [], onSuccess, onError);
        tx.executeSql(`DROP TABLE IF EXISTS user;`, [], onSuccess, onError);
        tx.executeSql(`DROP TABLE IF EXISTS compte;`, [], onSuccess, onError);
        tx.executeSql(`DROP TABLE IF EXISTS anomalie;`, [], onSuccess, onError);
        tx.executeSql(`DROP TABLE IF EXISTS compteur;`, [], onSuccess, onError);
      },
      () => {
        console.log(`TX fail`);
        reject();
      },
      () => {
        ToastSuccess('Suppression des tables de la base des donnés reussi!')
        console.log(`TX OK.`);
        console.log("Fin de la suppression des tables.");
        resolve();
      }
    );
  });
  return p;
}

export const creteTerminal = (numerTerminal, rueEnLecture) => {
  db.transaction(function (tx) {
    tx.executeSql(
      'INSERT INTO terminal (numeroTPL, rueEnLecture) VALUES (?,?)',
      [numerTerminal, rueEnLecture],
      (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          console.log('Data saved!!')
        } else console.log('Erreur enregistrement du terminal !!!');
      }
    );
  });

}

export default db;