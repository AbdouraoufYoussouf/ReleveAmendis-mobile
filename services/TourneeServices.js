import { ToastEchec } from "../src/Components/Notifications";
import db from "./SqliteDb";


export const insertTourne = (numeroTourne, moisTourne) => {

  console.log("Debut de l'ajout d'un Tourne.");
  const p = new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        const onSuccess = () => {
          console.log(`Success`);
          //ToastSuccess('Tourne ajouté avec success!!');
        };
        const onError = (tx, error) => {
          console.log('error', error);
          ToastEchec("Error,le numero du Tourne éxiste déjà!");
          // throw Error("Statement failed.");
        };
        //*********** Requettes *********//
        tx.executeSql(`INSERT INTO tournee(numeroTourne,moisTourne) VALUES (?,?);`,
          [numeroTourne, moisTourne],
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
        //console.log("Fin de l'ajout d'un Tourne.");
        resolve();
      }
    );
  });

}









