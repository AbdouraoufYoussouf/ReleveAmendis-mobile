import db from "./SqliteDb";
import { setAnomalies } from './redux/anomalieSlice'
import { ToastEchec, ToastSuccess } from "../src/Components/Notifications";
import axios from "axios";

const url = 'http://192.168.1.9:45455/api/Anomalie'

export const insertAllAnomalies = async () => {
  let anomalies = []
  await axios.get(url)
    .then(function (response) {
      //console.log(response.data);
      anomalies = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  anomalies.map((ano) => {
    insertAnomalieSqlite(
      ano.anomalieId,
      ano.designation,
      ano.libele,
      ano.codeFluide
    )
  })
}
export const insertAllFluides = async () => {
  let fluides = []
  await axios.get('http://192.168.1.9:45455/api/Fluide')
    .then(function (response) {
      //console.log(response.data);
      fluides = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  fluides.map((fluid) => {
    insertFluideSqlite(
      fluid.codeFluide,
      fluid.designation,
      fluid.filterSup,
      fluid.filterInf,
      fluid.filterMax,
      fluid.filterMin,
    )
  })
}
export const AddAnomaliesStore = () => {

  db.transaction(function (txn) {
    txn.executeSql(
      'SELECT * FROM anomalie',
      [],
      (tx, res) => {
        var temp = [];
        let len = res.rows.length;
        for (let i = 0; i < len; ++i)
          temp.push(res.rows.item(i));

        // console.log('Anomalie:', temp);
      }
    );
  });
}

export const insertAnomalieSqlite = ( designation, libele, codeFluide) => {

  console.log("Debut de l'ajout d'un Anomalie.");

  const p = new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        const onSuccess = () => {
          console.log(`Success`);
          //ToastSuccess('Anomalie ajouté avec success!!');
        };
        const onError = (tx, error) => {
          console.log('error', error);
          //ToastEchec("Error,le numero du Anomalie éxiste déjà!");
          // throw Error("Statement failed.");
        };
        //*********** Requettes *********//
        tx.executeSql(`INSERT INTO anomalie(designation,libele,codeFluide) VALUES (?,?,?);`,
          [ designation, libele, codeFluide],
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
        console.log("Fin de l'ajout d'un Anomalie.");
        resolve();
      }
    );
  });

}
export const insertFluideSqlite = (codeFluide, designation, filtreSup, filtreInf, filtreMax, filtreMin) => {

  console.log("Debut de l'ajout d'un Fluide.");

  const p = new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        const onSuccess = () => {
          console.log(`Success`);
          //ToastSuccess('Fluide ajouté avec success!!');
        };
        const onError = (tx, error) => {
          console.log('error', error);
          //ToastEchec("Error,le numero du Fluide éxiste déjà!");
          // throw Error("Statement failed.");
        };
        //*********** Requettes *********//
        tx.executeSql(`INSERT INTO fluide(codeFluide,designation,filtreSup,filtreInf,filtreMax,filtreMin) VALUES (?,?,?,?,?,?);`,
          [codeFluide, designation, filtreSup, filtreInf, filtreMax, filtreMin],
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
        console.log("Fin de l'ajout d'un Fluide.");
        resolve();
      }
    );
  });

}