import React, { useState } from 'react';
import db from '../services/SqliteDb';
import { ToastEchec, ToastSuccess } from '../src/Components/Notifications';
import { AddDataToStore } from './AddDataTotore';

export const insertCompteur = (numeroCompteur, idGeographique, nomAbonne, police,numeroRue,codeSecteur,codeFluide,codeEtat,etatLecture,ancienIndex,consMoyenne,numeroTourne,consommation,ordreRue) => {

  console.log("Debut de l'ajout d'un compteur.");
  let result = '';
  const p = new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        const onSuccess = () => {
          console.log(`Success`);
          //ToastSuccess('Compteur ajouté avec success!!');
        };
        const onError = (tx, error) => {
          console.log('error', error);
          ToastEchec("Error,le numero du compteur éxiste déjà!");
          // throw Error("Statement failed.");
        };
        //*********** Requettes *********//

        tx.executeSql(`INSERT INTO compteur(numeroCompteur,nomAbonne,idGeographique,police,numeroRue,codeSecteur,codeFluide,codeEtat,etatLecture,ancienIndex,consMoyenne,numeroTourne,consommation,ordreRue) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?);`,
          [numeroCompteur,nomAbonne, idGeographique, police,numeroRue,codeSecteur,codeFluide,codeEtat,etatLecture,ancienIndex,consMoyenne,numeroTourne,consommation,ordreRue],
          onSuccess, onError);
        if (onSuccess) {

        }
      },
      () => {
        console.log(`TX fail`);
        reject();
      },
      () => {
        console.log(`TX OK.`);
        console.log("Fin de l'ajout d'un compteur.");
        resolve();
      }
    );
  });

}

export const createNewCompteur = (numeroCompteur, idGeographique, nomAbonne, adresse) => {

  console.log("Debut de l'ajout d'un compteur.");
  let result = '';
  const p = new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        const onSuccess = () => {
          console.log(`Success`);
          ToastSuccess('Compteur ajouté avec success!!');
        };
        const onError = (tx, error) => {
          console.log('error', error);
          ToastEchec("Error,le numero du compteur éxiste déjà!");
          // throw Error("Statement failed.");
        };
        //*********** Requettes *********//
        tx.executeSql(`INSERT INTO compteur(numeroCompteur,idGeographique,nomAbonne,adresse) VALUES (?,?,?,?);`,
          [numeroCompteur, idGeographique, nomAbonne, adresse],
          onSuccess, onError);
        if (onSuccess) {

        }
      },
      () => {
        console.log(`TX fail`);
        reject();
      },
      () => {
        console.log(`TX OK.`);
        console.log("Fin de l'ajout d'un compteur.");
        resolve();
      }
    );
  });

}

export const verifieConsomation = (ancienIndex, newIndex, consMoyenne, setDialogVisible, setWarningMessg) => {
  let consommation = null;
  console.log(newIndex, ancienIndex, consMoyenne)
  if (ancienIndex != null) {
    consommation = newIndex - ancienIndex;
  } else {
    consommation = newIndex;
  }

  if (consMoyenne != null) {
    if (consommation <= (consMoyenne * 3 / 8)) {
      setWarningMessg('La consommation est trés faible, voulez-vous Enregistrer?')
      console.log('consomation', consommation, 'entre', 0, 'et', consMoyenne * 3 / 8)
    }
    if ((consMoyenne * 3 / 8 + 1) < consommation && consommation < (consMoyenne * 3 / 4)) {
      setWarningMessg('La consommation est faible, voulez-vous Enregistrer?')
      console.log('consomation', consommation, 'entre', (consMoyenne * 3 / 8 + 1), 'et', (consMoyenne * 3 / 4))
    } else {
      if ((consMoyenne * 3 / 4 + 1) < consommation && consommation < (consMoyenne * 3 / 2)) {
        setWarningMessg('La consommation est normal, voulez-vous Enregistrer?')
        console.log('consomation', consommation, 'entre', (consMoyenne * 3 / 4 + 1), 'et', (consMoyenne * 3 / 2))
      } else {
        if ((consMoyenne * 3 / 2 + 1) < consommation && consommation < (consMoyenne * 3)) {
          setWarningMessg('La consommation est forte, voulez-vous Enregistrer?')
          console.log('consomation', consommation, 'entre', (consMoyenne * 3 / 2 + 1), 'et', (consMoyenne * 3))
        } else {
          if ((consMoyenne * 3 + 1) <= consommation) {
            setWarningMessg('La consommation est trés forte, voulez-vous Enregistrer?')
            console.log('consomation', consommation, 'supperieur', (consMoyenne * 3 + 1))
          }else{
            if (consommation < 0) {
              setWarningMessg("La consommation est negative , veillez verifier l'index svp")
            }
          }
        }
      }
    }
  } else {
    setWarningMessg('La consommation est normal , voulez-vous Enregistrer?')
  }

  setDialogVisible(true)

}

export const updateNewIndex = (numeroCompteur, newIndex, ancienIndex, anomalie1, anomalie2) => {

  let consommation = null;

  if (ancienIndex != null) {
    consommation = newIndex - ancienIndex;
  } else {
    consommation = newIndex;
  }
  console.log("Debut de la lecture d'un compteur.");

  const p = new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        const onSuccess = () => {
          console.log(`Success`);
          ToastSuccess('Compteur lu avec success!!');

        };
        const onError = (tx, error) => {
          console.log('error', error);
          ToastEchec("Error:", error);
          // throw Error("Statement failed.");
        };

        tx.executeSql(`UPDATE compteur SET nouveauIndex = '${newIndex}' ,anomalie1='${anomalie1}',anomalie2='${anomalie2}',consommation = '${consommation}', dateReleve=CURRENT_DATE,heureReleve = CURRENT_TIME,etatLecture=1
          WHERE numeroCompteur='${numeroCompteur}';`,
          [],
          onSuccess, onError);
      },
      () => {
        console.log(`TX fail`);
        reject();
      },
      () => {
        console.log(`TX OK.`);
        console.log("Fin de la lecture du compteur.");
        resolve();
      }
    );
  });

  return p;

}
