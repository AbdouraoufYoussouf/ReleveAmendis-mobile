//import { useDispatch } from "react-redux"
import { setAnomalies, setDesignationAnomalies, setFluides } from "./redux/anomalieSlice";
import { loding, setAncienCompteurs, setCompteurs } from "./redux/compteurSlice";
import { setRue, setSecteur } from "./redux/rueSecteurSlice";
import { getTerminalLocal, isCreateCompteur, isCreatecTerminal } from "./redux/terminalSlice";
import { getAllTourne, setDataTourne ,setTourneCourant} from "./redux/tourneSlice";
import db from "./SqliteDb";
import { addAllTerminalsToStore, addTerminalToStore } from "./TerminalService";
import { addAllUsersToStore } from "./UserService";

export const AddDataToStore = (dispatch) => {

    addAllTerminalsToStore(dispatch);
    addAllUsersToStore(dispatch)
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
                dispatch(setAnomalies(temp ))
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
            'SELECT * FROM secteur',
            [],
            (tx, res) => {
                var temp = [];
                let len = res.rows.length;
                for (let i = 0; i < len; ++i)
                temp.push(res.rows.item(i));
                dispatch(setSecteur(temp))
                console.log('secteurs:', len);
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
                dispatch(setFluides(temp))
                console.log('fluides:', len);
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
                 console.log('terminalLocalService:', res.rows.item(0));
                 dispatch(isCreateCompteur(res.rows.item(0)?.isCreatec==0? false : true))
            }
        );
    });
   

}