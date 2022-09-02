import React, { useState } from 'react'
import db from './SqliteDb'

export const onLogin = (email, password) => {
    
    db.transaction((tx) => {
        const userData = [];
        tx.executeSql('SELECT * FROM user u JOIN compte c ON u.userId=c.userId WHERE c.email=? ', [email],
            (tx, results) => {
                const len = results.rows.length;
                if (!len) {
                    alert("Cette compte n'existe pas!");
                } else {
                    const row = results.rows.item(0);
                    userData.push(row)
                    console.log('userData', row.password)
                    if (password === row.password) {
                        navigation.navigate('home', { userData });
                        return;
                    }
                    alert('Connexion echoué!');
                }
            });
    });
}

export const loginHandler = (email) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
          "SELECT * FROM compte WHERE email=?",
          [email],
          //-----------------------
          (_, { rows }) => {
            if (rows.length > 0){
                alert("Cette compte n'existe pas!");
                 resolve(rows._array[0]);
                }
            else reject("Obj not found: email=" + email); // nenhum registro encontrado
          },
          (_, error) => reject(error) // erro interno em tx.executeSql
        );
      });
    });
  };


export const insertIfNotExists = (values) => {
    return new Promise((resolve, reject) => {
        const FIND_SQL = `SELECT COUNT(*) AS matches FROM ${TABLE_NAME} WHERE user_id= ${values.id}`;
        db.transaction((tx) => {
            tx.executeSql(FIND_SQL, [], (tx, results) => {
                if (results.rows.item(0).matches === 0) {
                    const columns = Object.keys(values);
                    let dbValues = Object.values(values);
                    const SQL = `INSERT INTO ${TABLE_NAME} (  ${columns.join(',')}, user_id ) VALUES ( ${new Array(columns.length).fill('?').join(',')}, '${values.id}' )`;
                    db.transaction((tx) => {
                        tx.executeSql(SQL, dbValues, (tx, results) => {
                            resolve(true);
                            deleteDuplicateUser(values.id)
                        });
                    });
                } else {
                    resolve(false);
                }
            });
        });
    });
};