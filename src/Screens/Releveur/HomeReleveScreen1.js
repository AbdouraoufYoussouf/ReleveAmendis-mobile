import React, { Fragment, useEffect, useState } from 'react'
import { ScrollView, Text, View, FlatList, TouchableOpacity, StyleSheet, useWindowDimensions, RefreshControl } from 'react-native';
import { Form, FormControle, InputFild, FormInput, FormContainer } from '../styles/homeStyle';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';


import { Icone, Icone1 } from '../../Connexion/styles';
import { setCompteurs } from '../../../services/redux/compteurSlice';
import { AddDataToStore } from '../../../services/AddDataTotore';
import db from '../../../services/SqliteDb';
import { refrecheCompteurs } from '../../../services/Compteur.Service';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
export default function HomeReleveScreen1({ navigation }) {
  const dispatch = useDispatch();
  const { height, width } = useWindowDimensions();

  ///////////////////////// les données /////////////////////
  const tourneCourant = useSelector((state) => state.tournes.tourneCourant);

  const datas = useSelector((state) => state.compteurs.ancienCompteurs);
  const compteurs = useSelector((state) => state.compteurs.compteurs);
  const [termSearch, setTermSearch] = useState('');

  const compteursSearch = compteurs.filter(cmpt => {
    return cmpt.numeroCompteur.toLowerCase().includes(termSearch.toLowerCase());
  });

  //console.log('compteurs', compteurs)


  /// Dialog ***********
  const [modalVisible, setModalVisible] = useState(false);
  const [errore, setErrore] = useState(null);
  /// Dialog ***********

  const [refreshing, setRefreshing] = useState(false);

  const FlatList_Header = () => {
    return (
      <View style={{ height: 35, width: width, }} >
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginTop: 4 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', width: width / 12, color: 'black', textAlign: 'center' }}> ID</Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold', width: width / 3, color: 'black', textAlign: 'center' }}> N° Compteur</Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold', width: width / 3, color: 'black', textAlign: 'center' }}> Nom Rue</Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold', width: 5 * width / 12, color: 'black', textAlign: 'center' }}> Nom Aboné</Text>
        </View>

      </View>
    );
  }

  const ItemRender = ({ numeroCompteur, codeSecteur, compteurId, idGeographique, police, codeEtat, adress, index, codeFluide, ancienIndex, consMoyenne, nomAbonne, etatLecture, consommation, numeroRue }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('pagelecture', {
          numeroCompteur: numeroCompteur,
          idGeographique: idGeographique,
          police: police,
          adresse: adress,
          codeEtat: codeEtat,
          codeFluide: codeFluide,
          consMoyenne: consMoyenne,
          ancienIndex: ancienIndex,
          nomAbonne: nomAbonne,
          numeroRue: numeroRue,
          etatLecture: etatLecture,
          consommation: consommation,
        });
      }}
      key={index} style={[styles.item, index % 2 && { backgroundColor: '#D0C9C0' }]}>
      <Text style={{ fontSize: 17, color: 'black', width: width / 12, textAlign: 'center' }}>{compteurId}</Text>
      <Text style={{ fontSize: 17, color: 'black', width: width / 3, textAlign: 'center' }}>{numeroCompteur}</Text>
      <Text style={{ fontSize: 17, color: 'black', width: width / 3, textAlign: 'center' }}>{numeroRue}</Text>
      <Text style={{ fontSize: 14, color: 'black', width: width / 2, textAlign: 'center' }}>{nomAbonne}</Text>

    </TouchableOpacity>
  );
  const ItemDivider = () => {
    return (
      <View style={{ height: 1, width: "100%", backgroundColor: "#607D8B", }} />
    );
  }

  const onChangeSearch = (term) => {
    setTermSearch(term)
    //console.log('Term',term)
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(setCompteurs([]));
    refrecheCompteurs(tourneCourant,dispatch)
    wait(1000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {

  }, [tourneCourant])

  return (
    <FormContainer  >
      <FormControle width='99%' marginV='1px' >
        <FormInput>
          {
            termSearch != '' ? (
              <Icone1 width='50px' onPress={() => setTermSearch('')} >
                <Ionicons name='md-close-circle-outline' size={30} color={'rgba(255,255,255,0.7)'} />
              </Icone1>
            ) : (
              <Icone1 width='50px' >
                <MaterialCommunityIcons name="gesture-two-double-tap" size={30} style={{ transform: [{ rotate: '90deg' }] }} color="rgba(255,255,255,0.7)" />
              </Icone1>
            )
          }

          <InputFild width='100%' paddingH='37px'
            //returnKeyType='search'
            value={termSearch}
            onChangeText={(term) => onChangeSearch(term)}
            placeholder='Recherche numero compteur'
            placeholderTextColor='gray'
          />
          <Icone width='50px'>
            <Ionicons name='search' size={30} color={'rgba(255,255,255,0.7)'} />
          </Icone>
        </FormInput>
      </FormControle>
      <Text style={{ backgroundColor: 'green', fontSize: 18, fontWeight: 'bold', width: '100%', color: 'white', height: 32, paddingVertical: 3, textAlign: 'center' }}>Liste des compteurs à lire {compteurs.length}/{datas.length} </Text>

      {/* la liste des compteurs non compteurId */}

      <View style={{ width: width, marginBottom: 80 }} >
        <ScrollView showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          <ScrollView horizontal={true} bounces={false}>
            <FlatList
              data={compteursSearch}
              renderItem={({ item, index }) => <ItemRender index={index}
                idGeographique={item.idGeographique}
                police={item.police}
                numeroCompteur={item.numeroCompteur}
                compteurId={item.compteurId}
                codeSecteur={item.codeSecteur}
                codeEtat={item.codeEtat}
                adress={item.adresse}
                ancienIndex={item.ancienIndex}
                consMoyenne={item.consMoyenne}
                nomAbonne={item.nomAbonne}
                etatLecture={item.etatLecture}
                numeroRue={item.numeroRue}
                consommation={item.consommation}
                codeFluide={item.codeFluide} />}
              keyExtractor={item => item.compteurId}
              ItemSeparatorComponent={ItemDivider}
              ListHeaderComponent={FlatList_Header}
              ListHeaderComponentStyle={{ borderBottomWidth: 2 }}
            />

          </ScrollView>
        </ScrollView>
      </View>
    </FormContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 2,
    minHeight: 35
  }
}) 