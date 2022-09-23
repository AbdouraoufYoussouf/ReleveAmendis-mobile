import axios from 'axios';
import { Alert, PermissionsAndroid } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import XLSX, { readFile } from 'xlsx';
import { AddDataToStore } from '../../../services/AddDataTotore';
import { insertCompteur } from '../../../services/Compteur.Service';
import { insertAllRue, insertAllSecteur } from '../../../services/RueSecteurService';
import db from '../../../services/SqliteDb';
import baseUrl from '../../../services/TerminalService';
import { insertTourne } from '../../../services/TourneeServices';
import { ToastAvertisement, ToastSuccess } from '../../Components/Notifications';

// function to handle importing
export const importExcelToData = async () => {
    try {
        const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.allFiles],
        });
        console.log(res[0].uri)
        let url = res[0].uri;
        if (url.startsWith('content://')) {
            const uriComponents = url.split('/')
            const fileNameAndExtension = uriComponents[uriComponents.length - 1]
            // const destPath = `${RNFS.TemporaryDirectoryPath}/${fileNameAndExtension}`
            console.log('fileName', fileNameAndExtension)
            console.log('chemin', destPath)
        }

        readFile(res[0].uri, 'ascii')
            .then(res => {
                const wb = XLSX.read(res, { type: 'binary' });
                const wsname = wb.SheetNames[0];
                const ws = wb.SheetNames[wsname];
                const donne = XLSX.utils.sheet_to_json(ws, { header: 1 });
                var temp = [];
                console.log('data importé', donne)
                // for(let i=1; i<donne.length; i++){
                //     temp.push({})
                // }
            })
    } catch (error) {
        console.log('ERr', error)
    }
}

// function to handle exporting
const exportDataToExcel = (data, tourne, setTourne, type) => {
    console.log('exportation data...')

    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(data)
    XLSX.utils.book_append_sheet(wb, ws, "Tourné")
    const wbout = XLSX.write(wb, { type: 'binary', bookType: "xlsx" });

    // const AppFolder = 'Amendis';
    // const DirectoryPath = RNFS.ExternalStorageDirectoryPath + '/' + AppFolder;
    // RNFS.mkdir(DirectoryPath);

    // // Write generated excel to Storage
    // RNFS.writeFile(DirectoryPath + '/Tourne ' + tourne + type, wbout, 'ascii').then((r) => {
    //     console.log('Success data exporté tourné', tourne, '', type);
    //     setTourne(tourne + 1)
    // }).catch((e) => {
    //     console.log('Error', e);
    //     console.log('Error lors de exportation data');
    // });

    console.log('Fin exportation data')
}


export const handleClickDecharge = async (data, tourne, setTourne, type) => {

    try {
        // Check for Permission (check if permission is already given or not)
        let isPermitedExternalStorage = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

        if (!isPermitedExternalStorage) {

            // Ask for permission
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: "Storage permission needed",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                // Permission Granted (calling our exportDataToExcel function)
                exportDataToExcel(data, tourne, setTourne, type);
                console.log("Permission granted");
            } else {
                // Permission denied
                console.log("Permission denied");
            }
        } else {
            // Already have Permission (calling our exportDataToExcel function)
            exportDataToExcel(data, tourne, setTourne, type);
        }
    } catch (e) {
        console.log('Error while checking permission');
        console.log(e);
        return
    }

};


// Ajouter les tournes et les compteurs dans la base des donnés sqlite

export const handleClickChargeDistant = async (terminalNumber,dispatch) => {
    console.log('debut charge',terminalNumber);
    let tourneeList = [];
    await axios.get(baseUrl+'Terminal/' + terminalNumber)
    .then(function (response) {
            console.log('terminaldata',response.data);
            tourneeList = response.data.tourneeList;
        })
        .catch(function (error) {
            console.log(error);
        });

    // Insert tournee in sqlite   db

    tourneeList?.map((tourne, index) => {
        db.transaction(function (txn) {
            txn.executeSql(`SELECT * from tournee WHERE numeroTourne=?`,
                [tourne.tourneeNumber],
                function (tx, res) {
                    console.log('Tourne Exist', res.rows.length);
                    if (res.rows.length == 0) {
                        insertTourne(tourne.tourneeNumber, tourne.moisTourne);
                        tourne.compteursList.map((compt, inde) => {
                            insertAllRue(compt.rueName);
                            insertAllSecteur(compt.codeSecteur);
                            insertCompteur(
                                compt.numberElecticMeter,
                                compt.geographicId,
                                compt.clientName,
                                compt.police,
                                compt.rueName,
                                compt.codeSecteur,
                                compt.codeFluide,
                                compt.etat,
                                compt.readStatus,
                                compt.oldIndex,
                                compt.comsupMoyen,
                                tourne.tourneeNumber,
                                compt.comsumption,
                                compt.ordreRue
                            )
                            console.log('compteur ajoute', inde)
                        })
                        console.log('tourne ajoute', index)
                    } else {
                        ToastAvertisement('Les tournes pour ce terminal sont déjà ajoutés!')
                    }
                }
            );
        });
        ToastSuccess(`${tourneeList.length}, Tournes ajoutés avec success!!`);
        setTimeout(() => {
            AddDataToStore(dispatch);
        }, 1000);
    })
}

export const dechargeCompteurs = (compteurs,message) => {
    let allCompteurs = compteurs.map((item) => {
        return {
            "numberElecticMeter": item.numeroCompteur,
            "geographicId": item.idGeographique,
            "clientName": item.nomAbonne,
            "oldIndex": item.ancienIndex,
            "police": item.police,
            "newIndex": item.nouveauIndex ? item.nouveauIndex :0,
            "etat": item.codeEtat,
            "readStatus": item.etatLecture,
            "comsumption": item.consommation,
            "comsupMoyen": item.consMoyenne,
            "codeFluide": item.codeFluide,
            "rueName": item.numeroRue,
            "ordreRue": item.ordreRue,
            "codeSecteur": item.codeSecteur,
            "anomalie1": item.anomalie1 ? item.anomalie1 :"",
            "anomalie2": item.anomalie2 ? item.anomalie2 :"",
            "dateReleve": item.dateReleve ? item.dateReleve : "",
            "newIndex1": item.nouveauIndex1 ? item.nouveauIndex1 :0,
            "newIndex2": item.nouveauIndex2 ? item.nouveauIndex2 :0,
            "newIndex3": item.nouveauIndex3 ? item.nouveauIndex3 :0,
            "newIndex4": item.nouveauIndex4 ? item.nouveauIndex4 :0,
            "newIndex5": item.nouveauIndex5 ? item.nouveauIndex5 :0,
            "newIndex6": item.nouveauIndex6 ? item.nouveauIndex6 :0,
            "newIndex7": item.nouveauIndex7 ? item.nouveauIndex7 :0
        }
    })


    let axiosConfig = {
        headers: {
            'accept': 'text/plain',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        }
    }
    allCompteurs.map((compt, index) => {
        console.log('numeroCompteur', compt.numberElecticMeter)
        axios.put(baseUrl+'ElectricMeter/decharge/' + compt.numberElecticMeter, compt, axiosConfig)
            .then((res) => {
                console.log('Compteur mis à jour avec succés')
                console.log(index)

            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })
    })
    ToastSuccess(message)
}