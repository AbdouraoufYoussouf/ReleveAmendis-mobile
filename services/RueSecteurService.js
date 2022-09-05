import db from "./SqliteDb";

export const insertAllRue = (nomRue) => {

    console.log("Debut de l'ajout d'un Rue.");

    const p = new Promise((resolve, reject) => {
        db.transaction(
            tx => {
                const onSuccess = () => {
                    console.log(`Success`);
                    //ToastSuccess('Rue ajouté avec success!!');
                };
                const onError = (tx, error) => {
                    console.log('error', error);
                    //ToastEchec("Error,le numero du Rue éxiste déjà!");
                    // throw Error("Statement failed.");
                };
                //*********** Requettes *********//
                tx.executeSql(`INSERT OR IGNORE INTO rue(nomRue) VALUES (?);`,
                    [nomRue],
                    onSuccess, onError);
            },
            () => {
                console.log(`TX fail`);
                reject();
            },
            () => {
                console.log(`TX OK.`);
                console.log("Fin de l'ajout d'un Rue.");
                resolve();
            }
        );
    });

}

export const insertAllSecteur = (designation) => {

    console.log("Debut de l'ajout d'un Secteur.");

    const p = new Promise((resolve, reject) => {
        db.transaction(
            tx => {
                const onSuccess = () => {
                    console.log(`Success`);
                    //ToastSuccess('Secteur ajouté avec success!!');
                };
                const onError = (tx, error) => {
                    console.log('error', error);
                    //ToastEchec("Error,le numero du Secteur éxiste déjà!");
                    // throw Error("Statement failed.");
                };
                //*********** Requettes *********//
                tx.executeSql(`INSERT OR IGNORE INTO secteur(designation) VALUES (?);`,
                    [designation],
                    onSuccess, onError);
            },
            () => {
                console.log(`TX fail`);
                reject();
            },
            () => {
                console.log(`TX OK.`);
                console.log("Fin de l'ajout d'un Secteur.");
                resolve();
            }
        );
    });

}
