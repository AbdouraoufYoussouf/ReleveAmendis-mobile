import axios from 'axios';
import { ToastEchec } from '../src/Components/Notifications';
import { getAllterminals, getTerminal } from './redux/terminalSlice';
import db from "./SqliteDb";

 
const baseUrl = 'http://192.168.1.10:45456/api/'
const url = baseUrl +'Terminal';
export default baseUrl;
let axiosConfig = {
  headers: {
    'accept': 'text/plain',
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
  }
};

export const addAllTerminalsToStore = async (dispatch) => {
  await axios.get(url)
    .then(function (response) {
      console.log(response.data);
      dispatch(getAllterminals(response.data))
    })
    .catch(function (error) {
      console.log(error);
    });
}


export const addTerminalToStore = async (terminalNumber, dispatch) => {
  await axios.get(url + '/' + terminalNumber)
    .then(function (response) {
      //console.log(response.data);
      dispatch(getTerminal(response.data))
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const updateTerminalOccupy = (terminalNumber) => {
  const terminal = {
    "isOccupy": true
  }
  axios.put(url + '/isoccupy/' + terminalNumber, terminal, axiosConfig)
    .then((res) => {
      console.log('Terminal mis à jour avec succés', res)
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
}
export const updateUserTerminal = (terminal, rue, user) => {

  const myterminal = {
    "status": user != null ? "onLigne" : "",
    "rueName": rue ? rue : "",
    "userName": user!= null ? user.nom : ""
  }
  axios.put(url + '/user/' + terminal.numeroTPL, myterminal, axiosConfig)
    .then((res) => {
      console.log(' user et status terminal mis à jour avec succés', res)
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
}

export const updateTerminalLocal = (terminalNumber, isCreatec) => {
  const p = new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        const onSuccess = () => {
          console.log(`Success Terminal updated local`);

          //ToastSuccess('Terminal mis à jour avec success!!');
        };

        const onError = (tx, error) => {
          console.log('error', error);
          ToastEchec("Error:", error);
          // throw Error("Statement failed.");
        };

        tx.executeSql(`UPDATE terminal SET numeroTPL = '${terminalNumber}' ,isCreatec='${isCreatec}'
        WHERE terminalId=1;`,
          [],
          onSuccess, onError);
      },
      () => {
        console.log(`TX fail`);
        reject();
      },
      () => {
        console.log(`TX OK.`);
        resolve();
      }
    );
  });
}
export const updateTerminalIsCreateLocal = (isCreatec) => {
  const p = new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        const onSuccess = () => {
          console.log(`Success isCreate`, isCreatec);

          //ToastSuccess('Terminal mis à jour avec success!!');
        };

        const onError = (tx, error) => {
          console.log('error', error);
          ToastEchec("Error:", error);
          // throw Error("Statement failed.");
        };

        tx.executeSql(`UPDATE terminal SET isCreatec='${isCreatec}'
        WHERE terminalId=1;`,
          [],
          onSuccess, onError);
      },
      () => {
        console.log(`TX fail`);
        reject();
      },
      () => {
        console.log(`TX OK.`);
        resolve();
      }
    );
  });
} 