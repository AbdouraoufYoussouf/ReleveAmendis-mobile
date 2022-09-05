import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, ScrollView, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Form, FormControle, MyText, InputFild, Label, FormInput, MyButton } from '../styles/homeStyle';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import { setCompteurs } from '../../../services/redux/compteurSlice';
import db from '../../../services/SqliteDb';

import MySelect from '../../Components/MySelect';
import MyDialog from '../../Components/MyDialog';
import MyDialogAndConfirm from '../../Components/MyDialogAndConfirm';
import { updateNewIndex, verifieConsomation } from '../../../services/Compteur.Service';
import { updateUserIdTourne } from '../../../services/UserService';
import { updateUserTerminal } from '../../../services/TerminalService';


const PageLectureCompteur = ({ navigation, route }) => {

  const dispatch = useDispatch();

  const { numeroCompteur, idGeographique, police, adresse, codeEtat, codeFluide, consMoyenne, ancienIndex, nomAbonne, consommation, etatLecture,numeroRue } = route.params;
  const compteurs = useSelector((state) => state.compteurs.compteurs);
  const tourneCourant = useSelector((state) => state.tournes.tourneCourant);
  const user = useSelector((state) => state.user.value);
  const terminalLocal = useSelector((state) => state.terminals.terminalLocal);
  const rue = useSelector((state) => state.rueSecteurs.rueEnlecture);

  const userId = user.userId;
console.log('user',user)
console.log('terminal',terminalLocal)
console.log('rue',rue)
  ///////////////////////// les inputes /////////////////////
  const [numCompt, setNumCompt] = useState(null);
  const [nouveauIndex, setNouveauIndex] = useState('');
  const [anomalie1, setAnomalie1] = useState("");
  const [anomalie2, setAnomalie2] = useState("");
  const [index1, setindex1] = useState();
  const [index2, setindex2] = useState();
  const [index3, setindex3] = useState();
  const [index4, setindex4] = useState();
  const [index5, setindex5] = useState();
  const [index6, setindex6] = useState();
  const [index7, setindex7] = useState();

  const [label1, setLabel1] = useState('');
  const [label2, setLabel2] = useState('');
  /// Dialog ***********
  const [modalVisible, setModalVisible] = useState(false);
  const [errore, setErrore] = useState(null);
  /// Dialog ***********

  /// DialogAndConfirm ***********
  const [dialogVisible, setDialogVisible] = useState(false);
  const [indicator, setIndicator] = useState(false);
  const [WarningMessg, setWarningMessg] = useState('');
  /// DialogAndConfirm ***********

  const anomaliesData = useSelector((state) => state.anomalies.designationAnomalie);

  // console.log('anomalie', compteurs)
  const [termSearch, setTermSearch] = useState('');

  const onChangeSearch = (term) => {
    setTermSearch(term)
    console.log('Term', term)
  }
  const designations = anomaliesData?.map((a, index) => {
    return { label: a.designation, value: a.designation }
  });

  const designationSearch = designations.filter(desi => {
    return desi.label.toLowerCase().includes(termSearch.toLowerCase());
  });


  const handleAnnuler = () => {
    setAnomalie1('');
    setAnomalie2('');
    setLabel1('');
    setLabel2('');
    setNouveauIndex('');
  }

  const handleSubmit = (ancienIndex, newIndex, consMoyenne, numeroCompteur) => {

    setNumCompt(numeroCompteur)
    //console.log(newIndex, ancienIndex, consMoyenne)
    verifieConsomation(ancienIndex, newIndex, consMoyenne, setDialogVisible, setWarningMessg);

    console.log("index:", nouveauIndex)
    console.log("anomalie1:", anomalie1)
    console.log("anomalie2:", anomalie2)
  }

  const handlSave = (numCompt, newIndex, ancienIndex, anomalie1, anomalie2,numeroRue) => {
    setIndicator(true);
    updateNewIndex(numCompt, newIndex, ancienIndex, anomalie1, anomalie2)

    let compteur = compteurs.filter((comt) => comt.numeroCompteur == numCompt)
    let newCompteurs = compteurs.filter((comt) => comt.numeroCompteur !== numCompt)
    console.log('newcompteurRue',compteur.numeroRue)
    handleAnnuler();

    dispatch(setCompteurs(newCompteurs))

    setDialogVisible(false);
    setIndicator(false);
    navigation.navigate('homeReleve');

    updateUserTerminal(terminalLocal,numeroRue,user)
  }

  useEffect(() => {

  }, [])

  return (
    <ScrollView

      keyboardShouldPersistTaps='never'
      keyboardDismissMode='on-drag'

      style={{
        flex: 1,
        backgroundColor: (codeFluide === 'BT') ? '#FF69B4' : (codeFluide === 'MT') ? '#A0522D' : '#00BFFF',
      }}
      showsVerticalScrollIndicator={false}>

      <KeyboardAvoidingView
        keyboardVerticalOffset={-270}
        behavior='position'>

        <MyDialog modalVisible={modalVisible}
          content={errore}
          setModalVisible={setModalVisible}
          type='warning'
        />
        <MyDialogAndConfirm
          dialogVisible={dialogVisible}
          setDialogVisible={setDialogVisible}
          indicator={indicator}
          content={WarningMessg}
          onPressSave={() => handlSave(numCompt, nouveauIndex, ancienIndex, anomalie1, anomalie2,numeroRue)}
          type='warning'
        />
        <View style={{ display: 'flex', flexDirection: 'column', }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 2 }}>
            Releve d'un compteur {codeFluide}
          </Text>
          <Form>
            <FormControle marginTop='35px'>
              <FormInput>
                <Label>N° C</Label>
                <InputFild value={numeroCompteur} keyboardType='numeric' width='57%' />
              </FormInput>
              <FormInput>
                <MyText large>Etat: </MyText>
                <InputFild keyboardType='numeric' value={codeEtat} width='10%' />
              </FormInput>
            </FormControle>

            <FormControle>
              <FormInput>
                <Label >Id Geo</Label>
                <InputFild value={idGeographique} keyboardType='numeric' width='57%' />
              </FormInput>
            </FormControle>

            <FormControle>
              <FormInput>
                <Label>Index</Label>
                <InputFild
                  placeholder='Index'
                  placeholderTextColor='gray'
                  value={nouveauIndex}
                  onChangeText={(index) => setNouveauIndex(index)}
                  keyboardType='numeric' width='57%' />
              </FormInput>
              <FormInput>
                <TouchableOpacity style={{}}
                  onPress={() => handleSubmit(ancienIndex, nouveauIndex, consMoyenne, numeroCompteur)}>
                  <MyButton bg='blue' height paddingTop='5px' width='80px' fontSize='22px' color='white' >OK</MyButton>
                </TouchableOpacity>
              </FormInput>
            </FormControle>

            <FormControle>
              <FormInput width='99%'>
                <Label >AN1</Label>
                <MySelect
                  isSearch={true}
                  onChangeSearch={onChangeSearch}
                  termSearch={termSearch}
                  setTermSearch={setTermSearch}
                  placeholder='Select Anomalie 1'
                  data={designationSearch}
                  label={label1}
                  setLabel={setLabel1}
                  setValue={setAnomalie1} />
              </FormInput>
            </FormControle>

            <FormControle>
              <FormInput width='99%' >
                <Label >AN2</Label>
                <MySelect
                  isSearch={true}
                  onChangeSearch={onChangeSearch}
                  termSearch={termSearch}
                  setTermSearch={setTermSearch}
                  placeholder='Select Anomalie 2'
                  data={designationSearch}
                  label={label2}
                  setLabel={setLabel2}
                  setValue={setAnomalie2} />
              </FormInput>
            </FormControle>

            {codeFluide == 'MT' ?
              (<>

                <FormControle>
                  <FormInput>
                    <Label minWidth='30px' >In1</Label>
                    <InputFild keyboardType='numeric' width='23%' />
                  </FormInput>
                  <FormInput>
                    <Label minWidth='30px' >In2</Label>
                    <InputFild keyboardType='numeric' width='23%' />
                  </FormInput>
                  <FormInput>
                    <Label minWidth='30px' >In3</Label>
                    <InputFild keyboardType='numeric' width='23%' />
                  </FormInput>
                </FormControle>

                <FormControle>
                  <FormInput>
                    <Label minWidth='30px' >In4</Label>
                    <InputFild keyboardType='numeric' width='23%' />
                  </FormInput>
                  <FormInput>
                    <Label minWidth='30px' >In5</Label>
                    <InputFild keyboardType='numeric' width='23%' />
                  </FormInput>
                  <FormInput>
                    <Label minWidth='30px' >In6</Label>
                    <InputFild keyboardType='numeric' width='23%' />
                  </FormInput>
                </FormControle>

                <FormControle>
                  <FormInput>
                    <Label minWidth='30px' >In7</Label>
                    <InputFild keyboardType='numeric' width='23%' />
                  </FormInput>
                </FormControle>
              </>)
              :
              (<></>)
            }

            <FormControle marginV='25px'>
              <FormInput>
                <TouchableOpacity onPress={() => {
                  navigation.navigate('details', {
                    numero: numeroCompteur,
                    idGeo: idGeographique,
                    police: police,
                    abonne: nomAbonne,
                    adresse: adresse,
                    codeEtat: codeEtat,
                    lecture: etatLecture,
                    ancienIndex: ancienIndex,
                    newIndex: nouveauIndex,
                    consMoyenne: consMoyenne,
                    consommation: consommation
                  });
                }}
                  style={styles.btnPreSuv}>
                  <MyButton width='75px' color='white' >Details</MyButton>
                  <Ionicons name="md-information-circle-outline" color="white" size={28} style={{ top: 2 }} />
                </TouchableOpacity>
              </FormInput>

              <FormInput>
                <TouchableOpacity
                  onPress={() => handleAnnuler()}
                  style={[styles.btnPreSuv, { backgroundColor: 'tomato' }]}>
                  <MaterialCommunityIcons name="cancel" size={24} color="black" style={styles.chevron} />
                  <MyButton width='80px' color='white' >Annuler</MyButton>
                </TouchableOpacity>
              </FormInput>
            </FormControle>
          </Form>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default PageLectureCompteur


const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',

  },

  btnPreSuv: {
    backgroundColor: '#333333',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 5,
    paddingHorizontal: 5,
  },

  chevron: { color: '#fff', fontSize: 25, top: 3 },

  dialog: {
    height: 120,
    borderRadius: 7,
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
  },

  paginationStyle: {
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  paginationText: {
    color: 'white',
    fontSize: 20
  }
}) 