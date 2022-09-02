//import { useDispatch } from "react-redux"
import { setAnomalies, setDesignationAnomalies } from "./redux/anomalieSlice";
import { loding, setAncienCompteurs, setCompteurs } from "./redux/compteurSlice";
import { setRue, setSecteur } from "./redux/rueSecteurSlice";
import { getTerminalLocal } from "./redux/terminalSlice";
import { getAllTourne, setDataTourne ,setTourneCourant} from "./redux/tourneSlice";
import db from "./SqliteDb";
import { addAllTerminalsToStore, addTerminalToStore } from "./TerminalService";

export const AddDataToStore = (dispatch) => {

    addAllTerminalsToStore(dispatch);
    
    ///Anomalies
    db.transaction(function (txn) {
        txn.executeSql(
            'SELECT * FROM anomalie',
            [],
            (tx, res) => {
                var temp = [];
                let len = res.rows.length;
                for (let i = 0; i < len; ++i)
                temp.push(res.rows.item(i));
                dispatch(setAnomalies(
                    { anomalies: temp }
                    ))
                    //console.log('Anomalie:', len);
            }
        );
    });
    ///Compteurs
    db.transaction(function (txn) {
        txn.executeSql(
            'SELECT * FROM compteur',
            [],
            (tx, res) => {
                var temp = [];
                let len = res.rows.length;
                console.log('Compteur:', len);
                for (let i = 0; i < len; ++i)
                    temp.push(res.rows.item(i));
               // console.log(temp[1])
                //dispatch(loding());
                dispatch(setAncienCompteurs(temp))
            }
        );
    });

    ///////*********** Add All Designations anomalies to store //////// */
    db.transaction(function (txn) {
        txn.executeSql(
            'SELECT * FROM anomalie',
            [],
            (tx, res) => {
                var temp = [];
                let len = res.rows.length;
                console.log('Anomalies:', len);
                for (let i = 0; i < len; ++i)
                    temp.push(res.rows.item(i));
                dispatch(setDesignationAnomalies(temp))
            }
        );
    });
    ///////*********** Add rue to store //////// */
    db.transaction(function (txn) {
        txn.executeSql(
            'SELECT * FROM rue',
            [],
            (tx, res) => {
                var temp = [];
                let len = res.rows.length;
                for (let i = 0; i < len; ++i)
                temp.push(res.rows.item(i));
                dispatch(setRue(temp))
                console.log('rues:', len);
            }
        );
    });
    ///////*********** Add Secteur to store //////// */
    db.transaction(function (txn) {
        txn.executeSql(
            'SELECT * FROM fluide',
            [],
            (tx, res) => {
                var temp = [];
                let len = res.rows.length;
                for (let i = 0; i < len; ++i)
                temp.push(res.rows.item(i));
                dispatch(setSecteur(temp))
                console.log('fluides:', len);
            }
        );
    });
   
  
   
    ///////*********** Add Secteur to store //////// */
    db.transaction(function (txn) {
        txn.executeSql(
            'SELECT * FROM tournee',
            [],
            (tx, res) => {
                var temp = [];
                let len = res.rows.length;
                for (let i = 0; i < len; ++i)
                temp.push(res.rows.item(i));
                dispatch(getAllTourne(temp));
                //  dispatch(setTourneCourant(temp[0].numeroTourne))
                // console.log('numeroTournes:', temp[0].numeroTourne);
            }
        );
    });
   
    ///////*********** Add terminalNumber to store //////// */
    db.transaction(function (txn) {
        txn.executeSql(
            'SELECT * FROM terminal',
            [],
            (tx, res) => {
                 dispatch(getTerminalLocal(res.rows.item(0)));
                 //addTerminalToStore(res.rows.item(0).numeroTPL,dispatch)
                 console.log('terminalLocalService:', res.rows.item(0)?.numeroTPL);
            }
        );
    });
   

}