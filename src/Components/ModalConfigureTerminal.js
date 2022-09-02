import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, ToastAndroid, TouchableOpacity, Modal } from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { Form, FormControle, FormInput, InputFild, Label, MyButton, MyText } from "../Screens/styles/homeStyle";
import { useDispatch, useSelector } from "react-redux";
import MySelect from "./MySelect";
import { updateTerminalLocal, updateTerminalOccupy } from "../../services/TerminalService";
import { editTerminalLocalStore, editTerminalStore } from "../../services/redux/terminalSlice";
import MyDialog from "./MyDialog";
import db from "../../services/SqliteDb";

export const ModalConfigureTerminal = ({ modalVisibleTerminal, setModalVisibleTerminal }) => {
  const dispatch = useDispatch()
  const allTerminals = useSelector((state) => state.terminals.terminals);
  const terminalLocal = useSelector((state) => state.terminals.terminalLocal);
  const dbExist = useSelector((state) => state.terminals.isDbExist);
  const [label1, setLabel1] = useState(terminalLocal?.numeroTPL);
  console.log('db exist', dbExist)

  /// Dialog ***********
  const [modalVisible, setModalVisible] = useState(false);
  const [errore, setErrore] = useState(null);
  /// Dialog ***********

  const [terminal, setTerminal] = useState(terminalLocal?.numeroTPL);

  //console.log('termianl', terminalLocal)

  const terminalsNoOccupy = allTerminals?.filter((termi) => termi.isOccupy == false)
  const terminals = terminalsNoOccupy?.map((t) => {
    return { label: t.terminalNumber, value: t.terminalNumber }
  });

  const handlSaveTerminal = () => {

    if (!dbExist) {
      console.log('creer dabord la db')

      setErrore("Veillez d'abord créer la base des données s'il vous plait!!")
      setModalVisible(true)
    } else {
      updateTerminalLocal(terminal, terminalLocal?.isCreatec)
      updateTerminalOccupy(terminal)
      dispatch(editTerminalStore({ terminalNumber: terminal, isOccupy: true }))

      console.log('Termial Configuré!')
      ToastAndroid.showWithGravityAndOffset(
        "Termial Configuré avec le N° " + terminal,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        200
      );
      dispatch(editTerminalLocalStore({ idTerminal: 1, terminalNumber: terminal, isCreatec: terminalLocal?.isCreatec }))

    }

  }

  return (
    <>
      <MyDialog modalVisible={modalVisible}
        content={errore}
        setModalVisible={setModalVisible}
        type='warning'
      />
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisibleTerminal}
        onRequestClose={() => setModalVisibleTerminal(!modalVisibleTerminal)}
      >

        <Pressable onPress={() => setModalVisibleTerminal(false)} style={styles.madalContainerTer}>
          <Pressable onPress={() => setModalVisibleTerminal(true)} style={styles.modalContentTer}>
            <View style={{ width: '100%', height: 35, alignItems: 'center', paddingTop: 3 }}>
              <Text style={{ textAlign: 'center', fontSize: 20, marginTop: 2, color: 'white' }}>Configurer le terminal</Text>
              <Entypo onPress={() => setModalVisibleTerminal(false)} style={{ right: 10, position: 'absolute', top: -3 }} name="cross" size={40} color="white" />
            </View>
            <View>
              <Form marginTop='20px'>
                <FormControle>
                  <FormInput width='75%'>
                    <Label color='white' ></Label>
                    <MySelect
                      placeholder='Select Terminal'
                      data={terminals}
                      label={label1}
                      setLabel={setLabel1}
                      setValue={setTerminal}
                      center={true}
                    />
                  </FormInput>
                </FormControle>

                <FormControle marginV='15px'>
                  <FormInput>
                    <TouchableOpacity onPress={() => setLabel1('')} style={[styles.btnPreSuv, { backgroundColor: 'tomato' }]}>
                      <MyButton width='85px' color='white' >Annuler</MyButton>
                      <Ionicons name="md-information-circle-outline" color="white" size={28} style={{ top: 2 }} />
                    </TouchableOpacity>
                  </FormInput>

                  <FormInput>
                    <TouchableOpacity onPress={() => { handlSaveTerminal(), setModalVisibleTerminal(!modalVisibleTerminal) }}
                      style={[styles.btnPreSuv, { backgroundColor: '#465881' }]}>
                      <MyButton width='110px' color='white' >Enregistrer</MyButton>
                    </TouchableOpacity>
                  </FormInput>
                </FormControle>
              </Form>
            </View>
          </Pressable>
        </Pressable>

      </Modal>
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
    backgroundColor: 'gray',
    marginVertical: 2,
    display: "flex",
    flexDirection: 'row',
    height: 30
  },
  modalContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
  },
  modalContent: {
    borderTopLeftRadius: 27,
    borderTopRightRadius: 27,
    width: 165,
    height: 'auto',
    position: 'absolute',
    backgroundColor: 'white',
    bottom: 50,
    right: 0
  },
  body: {
    backgroundColor: 'white',
    width: '100%',
  },
  modalText: {
    fontSize: 17,
    color: 'white',
  },
  /////////////////
  btnPreSuv: {
    backgroundColor: '#333333',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  madalContainerTer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalContentTer: {
    width: '100%',
    height: 175,
    position: 'absolute',
    borderTopEndRadius: 25,
    borderTopLeftRadius: 25,
    bottom: 0,
    backgroundColor: '#444',
    //justifyContent: 'center',
    //alignItems: 'center',
  },
})