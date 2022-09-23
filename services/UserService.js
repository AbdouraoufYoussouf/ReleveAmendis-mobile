import axios from "axios";
import { getAllUsers } from "./redux/userSlice";
import db from "./SqliteDb";
import baseUrl from "./TerminalService";

const url = baseUrl +'User';

export const addAllUsersToStore = (dispatch) => {
  axios.get(url)
    .then(response => {
      console.log('users',response.data)
      dispatch(getAllUsers(response.data))
    });
}

export const updateUserIdTourne = (userId,numeroTourne) => {

    const p = new Promise((resolve, reject) => {
      db.transaction(
        tx => {
          const onSuccess = () => {
            console.log(`Success`);
            //ToastSuccess('Compteur lu avec success!!');
  
          };
          const onError = (tx, error) => {
            console.log('error', error);
            //ToastEchec("Error:", error);
            // throw Error("Statement failed.");
          };
  
          tx.executeSql(`UPDATE tournee SET usserId = '${userId}'
            WHERE numeroTourne='${numeroTourne}';`,
            [],
            onSuccess, onError);
        },
        () => {
          console.log(`TX fail`);
          reject();
        },
        () => {
          console.log(`TX OK.`);
          console.log("Fin de la mise ç à jour de idUser dans tournee.");
          resolve();
        }
      );
    });
  
    return p;
  
  }