import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';

import XLSX, { readFile } from 'xlsx';
import { dechargeCompteurs, handleClickChargeDistant, handleClickDecharge, importExcelToData } from './Controleur';
import axios from 'axios';
import { getTerminal } from '../../../services/redux/terminalSlice';
import { getAllTourne } from '../../../services/redux/tourneSlice';
import { insertTourne } from '../../../services/TourneeServices';
import { insertCompteur } from '../../../services/Compteur.Service';
import { ToastAvertisement, ToastSuccess } from '../../Components/Notifications';
import db from '../../../services/SqliteDb';

var input = res => res;
var output = str => str

export default function HomeFacturateur() {
  const dispatch = useDispatch()
  const [tourne, setTourne] = useState(1)
  const allTerminals = useSelector((state) => state.terminals.terminals);

  const terminalLocal = useSelector((state) => state.terminals.terminalLocal);
  const terminal = useSelector((state) => state.terminals.terminal);
  console.log('terminalLocal', terminalLocal)
  const dbExist = useSelector((state) => state.terminals.isDbExist);

  const datasComplete = useSelector((state) => state.compteurs.ancienCompteurs);
  const datasPartiel = datasComplete.filter((comt) => comt.etatLecture === 'L');

 // console.log("dataComplet", datasComplete.length)
  //console.log("compteurPartiel", datasPartiel)

  let handleDechargeCptLocal = () => {
    handleClickDecharge(datasComplete, tourne, setTourne, ' Complete')
  }
  let handleDechargePrlLocal = () => {
    handleClickDecharge(datasPartiel, tourne, setTourne, ' Partiel')
  }

  let handleCharge = () => {
    importExcelToData()

  }

  let handleDechargeCptDistant = () => {
    dechargeCompteurs(datasComplete, "Vous venez de décharger tous les compteurs de ce terminal!")
  }
  let handleDechargePrlDistant = () => {
    dechargeCompteurs(datasPartiel, "Vous venez de décharger tous les compteurs lu de ce terminal!")
  }
  const termianlExist = allTerminals.find((term) => term.terminalNumber.toLowerCase() === terminalLocal?.numeroTPL.toLowerCase());
  //console.log('termianlex', termianlExist)

  let handleChargeDistant = () => {
    if (dbExist) {
      if(termianlExist!=null){
        handleClickChargeDistant(terminalLocal?.numeroTPL,dispatch)
      }else{
        ToastAvertisement("Vous devez configurer le terminal avant de faire la charge!")
      }
    } else {
      ToastAvertisement("Vous devez d'abord créer la base des données et configurer le terminal!!")
    }

  }

  useEffect(()=>{
console.log('homeFacturateur')
  },[terminalLocal])

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4169E1', '#6495ED',]}
        style={styles.linearGradient}
      >
        <View style={{ justifyContent: 'space-around', alignItems: 'center', width: '100%', height: '53%' }}>
          {/* <TouchableOpacity style={styles.button}
            onPress={() => handleDechargeCptLocal()}>
            <Text style={styles.textButton}>Décharge complete local</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}
            onPress={() => handleDechargePrlLocal()}>
            <Text style={styles.textButton}>Décharge Partielle local</Text>
          </TouchableOpacity> */}

          <TouchableOpacity style={styles.button}
            onPress={() => handleDechargeCptDistant()}
          >
            <Text style={[styles.textButton, { backgroundColor: '#444', color: 'white' }]}>Décharge complete distant</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}
            onPress={() => handleDechargePrlDistant()}
          >
            <Text style={[styles.textButton, { backgroundColor: '#444', color: 'white' }]}>Décharge Partielle distant</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={{ alignSelf: 'center', width: '50%', height: 35 }}
            onPress={() => handleCharge()}>
            <Text style={[styles.textButton, { backgroundColor: '#444', color: 'white' }]}>Charge local</Text>
          </TouchableOpacity> */}

          <TouchableOpacity style={{ alignSelf: 'center', width: '50%', height: 35 }}
            onPress={() => handleChargeDistant()}>
            <Text style={[styles.textButton, { backgroundColor: 'white', color: 'blue' }]}>Charge distant</Text>
          </TouchableOpacity>
        </View>

      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradient: {

    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'

  },
  button: {
    alignSelf: 'center',
    width: '70%', height: 35
  },
  textButton: {
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#444',
    fontSize: 20, padding: 3,
    color: 'white'
  }
})
