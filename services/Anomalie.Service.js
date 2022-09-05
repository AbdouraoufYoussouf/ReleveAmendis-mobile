import db from "./SqliteDb";
import { addAnomalieStore, deleteAnomalieStore, setAnomalies, setFluides } from './redux/anomalieSlice'
import { ToastEchec, ToastSuccess } from "../src/Components/Notifications";
import axios from "axios";
import { ToastAndroid } from "react-native";

const url = 'http://192.168.1.9:45455/api/Anomalie';
let axiosConfig = {
  headers: {
    'accept': 'text/plain',
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
  }
};

export const insertAllAnomalies = async (dispatch) => {
  let anomalies = []
  await axios.get(url)
    .then(function (response) {
      console.log(response.data);
      dispatch(setAnomalies(response.data))
      anomalies = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  anomalies.map((ano) => {
    insertAnomalieSqlite(
      ano.designation,
      ano.libele,
      ano.codeFluide,
      ano.anomalieId
    )
  })
}
export const insertAllFluides = async (dispatch) => {
  let fluides = []
  await axios.get('http://192.168.1.9:45455/api/Fluide')
    .then(function (response) {
      //console.log(response.data);
      fluides = response.data;
      dispatch(setFluides(response.data))
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

export const insertAnomalieSqlite = ( designation, libele, codeFluide,anomalieId) => {

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
        tx.executeSql(`INSERT INTO anomalie(designation,libele,codeFluide,anomalieId) VALUES (?,?,?,?);`,
          [ designation, libele, codeFluide,anomalieId],
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

export const updateFluideLocal = (codeFluide,filtreSup, filtreInf,filtreMax,filtreMin) => {
  const p = new Promise((resolve, reject) => {
  db.transaction(
    tx => {
      const onSuccess = () => {
        console.log(`Success Fluide`);
       
        //ToastSuccess('Fluide configuré avec success!!');
      };

      const onError = (tx, error) => {
        console.log('error', error);
        //ToastEchec("Error:", error);
        // throw Error("Statement failed.");
      };

      tx.executeSql(`UPDATE fluide SET filtreSup = '${filtreSup}' ,filtreInf='${filtreInf}',filtreMax='${filtreMax}',filtreMin='${filtreMin}'
        WHERE codeFluide='${codeFluide}';`,
        [],
        onSuccess, onError);
    },
    () => {
      console.log(`TX fail`);
      reject();
    },
    () => {
      console.log(`TX OK. Fluide mis à jour`);
      resolve();
    }
  );
});
} 

export const updateFluide = async (codeFluide,filtreSup, filtreInf,filtreMax,filtreMin) => {
  let fluid = {
    "filterSup": filtreSup,
    "filterInf": filtreInf,
    "filterMax": filtreMax,
    "filterMin": filtreMin
}
 await axios.put('http://192.168.1.9:45455/api/Fluide/' + codeFluide, fluid, axiosConfig)
    .then((res) => {
      console.log('Fluide mis à jour avec succés', res)
      updateFluideLocal(codeFluide,filtreSup, filtreInf,filtreMax,filtreMin)
      ToastAndroid.showWithGravityAndOffset(
        "Fluide Configuré avec succès! ",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        200
      );
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
}
export const addAnomalie = async (designation,libele, codeFluide,dispatch) => {
  let anomalie = {
    "designation": designation,
    "libele": libele,
    "codeFluide": codeFluide
  }
  let anomalieStore = {
    "codeAnomalie":'',
    "designation": designation,
    "libele": libele,
    "codeFluide": codeFluide
  }
  console.log('anomalie',anomalie)
 await axios.post(url, anomalie, axiosConfig)
    .then((res) => {
      console.log('Anomalie ajouté avec succés', res)
      
      insertAnomalieSqlite(designation,libele,codeFluide)
     ToastSuccess( "Anomalie ajouté avec succès! ")
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
}


// export const deleteAnomalie = (idAnomalie, dispatch) => {
 
//   axios.delete(url+'/'+idAnomalie, axiosConfig)
//   .then((res) => {
//       dispatch(deleteAnomalieStore(idAnomalie))
//       console.log(idAnomalie, 'Anomalie supprimé avec succés',res)
//       ToastAndroid.showWithGravityAndOffset(
//         "Anomalie supprimé avec succès! ",
//         ToastAndroid.LONG,
//         ToastAndroid.BOTTOM,
//         25,
//         200
//       );
//     })
//     .catch((err) => {
//       console.log("AXIOS ERROR: ", err);
//     })
// }