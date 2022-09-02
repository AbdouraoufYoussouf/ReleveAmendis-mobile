import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import StackNavigation from './src/Navigation/StackNavigation';
import db, { createDatabase, dropAllTables, seedDatabase } from './services/SqliteDb';
import { Root } from 'react-native-alert-notification';
import { useDispatch, useSelector } from 'react-redux';
import { setAnomalies, setDesignationAnomalies, updatedAnomalieStore } from './services/redux/anomalieSlice'
import { loding, setAncienCompteurs, setCompteurs } from './services/redux/compteurSlice';
import { AddDataToStore } from './services/AddDataTotore';
import { AddAnomaliesStore, UpdateAnomalie } from './services/Anomalie.Service';
import axios from 'axios';
import { isDbExist } from './services/redux/terminalSlice';

export default function App() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.value);
  const userId = user.userId;
  const tourneCourant = useSelector((state) => state.tournes.tourneCourant);
 

  useEffect(() => {
    /////// Create DB if not exist ***********
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT 1 from sqlite_master WHERE type='table' AND name = 'user'",
        [],
        function (tx, res) {
          console.log('APP DB exist =', res.rows.length);
          if (res.rows.length == 0) {
            createDatabase();
            dispatch(isDbExist())
          }else{
            dispatch(isDbExist())
            console.log('dv', res.rows.length);

          }
        }
      );
    });

    //dropAllTables()
    //seedDatabase()
    
  }, []);
  AddDataToStore(dispatch);

  db.transaction(function (txn) {
    txn.executeSql(
      'SELECT * FROM compteur',
      [],
      (tx, res) => {
        var temp = [];
        let len = res.rows.length;
        for (let i = 0; i < len; ++i)
          temp.push(res.rows.item(i));
        const comptNonLus = temp.filter((nlu) => (nlu.etatLecture == 0 || nlu.etatLecture == null))
        const compteurByTourne = comptNonLus.filter((cmt) => cmt.numeroTourne == tourneCourant)
        // console.log('CompteurNonluByTourne1:', compteurByTourne.length);
        // console.log('numeoTourneCourant:', tourneCourant);
        dispatch(dispatch(setCompteurs(compteurByTourne)))
      }
    );
  });

  return (

    <Root >
      <NavigationContainer>
        <StatusBar barStyle='light-content' backgroundColor='gray' />
        <StackNavigation />
      </NavigationContainer>
    </Root>
  );
}

