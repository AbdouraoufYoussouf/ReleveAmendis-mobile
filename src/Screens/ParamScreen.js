import React, { useState, useRef, useEffect } from "react";
import { AntDesign, MaterialCommunityIcons, Ionicons, Entypo } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { DotIndicator, UIActivityIndicator, } from 'react-native-indicators';

import { StyleSheet, Text, View, Pressable, TouchableOpacity, Modal, Switch } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { ModalConfigureTerminal } from "../Components/ModalConfigureTerminal";
import { AddDataToStore } from "../../services/AddDataTotore";
import { updateTerminalIsCreateLocal, updateTerminalLocal } from "../../services/TerminalService";
import { editTerminalLocalStore, isCreateCompteur, isDbExist, isDbNotExist } from "../../services/redux/terminalSlice";
import db, { createDatabase, dropAllTables } from "../../services/SqliteDb";
import { insertAllAnomalies, insertAllFluides } from "../../services/Anomalie.Service";
import { ToastAvertisement, ToastSuccess } from "../Components/Notifications";

export default function ParamScreen() {

  const dispatch = useDispatch()
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [indicatorCreate, setIndicatorCreate] = useState(false);
  const [modalVisibleTerminal, setModalVisibleTerminal] = useState(false);
  const terminalLocal = useSelector((state) => state.terminals.terminalLocal);
  const createCompteur = useSelector((state) => state.terminals.isCreatec);
  const dbExist = useSelector((state) => state.terminals.isDbExist);

  const [isEnabled, setIsEnabled] = useState(terminalLocal?.isCreatec == 1 ? true : false);

console.log(terminalLocal?.isCreatec)
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    dispatch(isCreateCompteur(!isEnabled))
    updateTerminalIsCreateLocal(!isEnabled == true ? 1 : 0)
  }


  useEffect(() => {
    //handleIsCreate()
  }, [isEnabled])

  function toggleModal() {
    if (!modalVisible) {
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  };

  const goto = (route) => {
    navigation.navigate(route);
    setModalVisible(false);
  }

  const createDb = () => {
    setIndicatorCreate(true)
    if (dbExist) {
      db.transaction(function (txn) {
        txn.executeSql(`SELECT * from anomalie`,
        [],
        function (tx, res) {
          if (res.rows.length == 0) {
            
            console.log('add data')
              insertAllAnomalies(dispatch);
              insertAllFluides(dispatch);
              //toggleModal();
              setTimeout(() => {
                //AddDataToStore(dispatch);
                setIndicatorCreate(false)
                ToastSuccess('La base des données est créer avec des données ajoutés !')
              }, 1000);
            } else {
              setIndicatorCreate(false)
              ToastAvertisement('La base des données exist déjà !')
            }
          }
        );
      });
    }else{
      createDatabase();
      dispatch(isDbExist())
      db.transaction(function (txn) {
        txn.executeSql(`SELECT * from anomalie`,
        [],
        function (tx, res) {
          if (res.rows.length == 0) {
            
            console.log('add data')
            insertAllAnomalies(dispatch);
            insertAllFluides(dispatch);
            setIndicatorCreate(false)
            ToastSuccess('La base des données est créer avec des données ajoutés !')
            //toggleModal();
            setTimeout(() => {
              //AddDataToStore(dispatch);
            }, 3000);
          } else {
              setIndicatorCreate(false)
              ToastAvertisement('La base des données exist déjà !')
            }
          }
        );
      });
    }

  }

  const deleteDb = () => {
    if (dbExist) {
      dropAllTables()
      //toggleModal();
      dispatch(isDbNotExist())
    }else{
      ToastAvertisement("La base des données n'exist pas veillez la créer!")
    }

  }
  return (
    <>
      <TouchableOpacity style={styles.popovercom} onPress={toggleModal}>
        <Ionicons name="settings" color='#444' size={25} />
        <Text style={{ fontSize: 15, marginHorizontal: 3, color: '#444' }}>Parametre</Text>
      </TouchableOpacity>

      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Pressable
          onPress={() => { setModalVisible(false); }}
          style={styles.modalContainer}>

          <Pressable onPress={() => setModalVisible(true)}
            style={styles.modalContent}>

            <View style={styles.body}>

              <TouchableOpacity style={[styles.contText, { marginTop: 10 }]} >
                <AntDesign style={{ marginTop: 2 }} name="check" size={22} color="white" />
                <Text style={styles.modalText}>Créer compteur   </Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                  style={{marginLeft:25}}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.contText}
              onPress={()=>createDb()}
              >
                <Entypo style={{ margin: 3 }} name="database" size={24} color="white" />
                {
                  indicatorCreate?(
                    <DotIndicator color='gray' size={15} style={{display:'flex',alignSelf:'center'}} />
                  ):(
                    <Text  style={{ fontSize: 20, color: 'white' }}>Créer DB & Inserer data</Text>
                  )
                }

              </TouchableOpacity>

              <TouchableOpacity style={styles.contText}
                onPress={deleteDb}>
                <Entypo style={{ margin: 3 }} name="database" size={24} color="white" />
                <Text style={{ fontSize: 20, color: 'tomato' }}>Supprimer DB</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.contText}
                onPress={() => { goto('fluide') }}>
                <AntDesign style={{ marginTop: 3 }} name="check" size={22} color="white" />
                <Text style={styles.modalText}>Parametrer les Fluides</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.contText, { marginBottom: 3 }]}
                onPress={() => { setModalVisible(false), setModalVisibleTerminal(true) }}>
                <AntDesign style={{ marginTop: 3 }} name="check" size={22} color="white" />
                <Text style={styles.modalText}>Configurer le Terminal</Text>

              </TouchableOpacity>

              {/* <TouchableOpacity style={[styles.contText, { marginBottom: 3 }]}
                onPress={() => { setModalVisible(false), setModalVisibleTerminal(true) }}>
                <Ionicons name="md-information-circle-outline" style={{ marginTop: 3 }}  size={27} color="white" />
                <Text style={styles.modalText}>Apropos du Terminal</Text>
              </TouchableOpacity> */}

              <View style={{ height: 50, width: 79, backgroundColor: '#444', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: -50, right: 0, }} >

                <Ionicons name="settings" color='white' size={25} style={{ marginTop: 5, }} />
                <Text style={{ fontSize: 15, color: 'white', marginBottom: 5, }}>Parametre</Text>

              </View>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      <ModalConfigureTerminal modalVisibleTerminal={modalVisibleTerminal} setModalVisibleTerminal={setModalVisibleTerminal} />
    </>
  )
}

const styles = StyleSheet.create({

  popovercom: {
    backgroundColor: 'white',
    display: 'flex', flexDirection: 'column',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 1
  },
  contText: {
    paddingLeft: 3,
    display: "flex",
    flexDirection: 'row',
    height: 35,
    alignItems: 'center',
    //justifyContent:'center',
    marginTop: 0,
    marginBottom: 7,

    paddingRight: 5,
    paddingBottom: 2,
    //marginVertical:3,
    borderBottomWidth: 1, borderBottomColor: 'gray',
  },
  modalContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 10,
    width: 'auto',
    height: 'auto',
    position: 'absolute',
    bottom: 50,
    right: 0,
    backgroundColor: '#444',
    borderWidth: 1, borderColor: 'gray',
  },
  body: {
    //backgroundColor: 'white',
    width: '100%',
  },
  modalText: {
    fontSize: 18,
    color: 'white',

  },


})