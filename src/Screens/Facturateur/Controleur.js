import axios from 'axios';
import { Alert, PermissionsAndroid } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import XLSX, { readFile } from 'xlsx';
import { insertCompteur } from '../../../services/Compteur.Service';
import db from '../../../services/SqliteDb';
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

export const handleClickChargeDistant = async (terminalNumber) => {
    let tourneeList = [];
    await axios.get('http://192.168.1.9:45455/api/Terminal/' + terminalNumber)
        .then(function (response) {
            //console.log(response.data);
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
                            insertCompteur(
                                compt.numberElecticMeter,
                                compt.geographicId,
                                compt.clientName,
                                compt.police,
                                compt.rueName,
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

    })
}

export const dechargeCompteurs = () => {
    let allCompteurs = dataTournee.map((item) => {
        return {
            "numberElecticMeter": item.NumberElecticMeter,
            "geographicId": item.GeographicId,
            "clientName": item.ClientName,
            "oldIndex": item.OldIndex,
            "police": item.Police,
            "newIndex": 0,
            "etat": item.Etat,
            "readStatus": item.ReadStatus,
            "comsumption": 0,
            "comsupMoyen": item.ComsupMoyen,
            "codeFluide": item.CodeFluide,
            "rueName": item.RueName,
            "ordreRue": item.OrdreRue,
            "codeSecteur": item.CodeSecteur,
            "newIndex1": 0,
            "newIndex2": 0,
            "newIndex3": 0,
            "newIndex4": 0,
            "newIndex5": 0,
            "newIndex6": 0,
            "newIndex7": 0
        }
    })

    let axiosConfigD = {
        headers: {
            'accept': 'text/plain',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        }
    }

    axios.post(url, data, axiosConfigD)
    .then((res) => {
      console.log('Compteur added')

      dispatch(setAllTourne(data))
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
}